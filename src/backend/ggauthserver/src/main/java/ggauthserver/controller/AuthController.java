package ggauthserver.controller;

import ggauthserver.exception.BadRequestException;
import ggauthserver.model.AuthProvider;
import ggauthserver.model.User;
import ggauthserver.payload.ApiResponse;
import ggauthserver.payload.AuthResponse;
import ggauthserver.payload.LoginRequest;
import ggauthserver.payload.NewPincodeRequest;
import ggauthserver.payload.PincodeRequest;
import ggauthserver.payload.SignUpRequest;
import ggauthserver.repository.UserRepository;
import ggauthserver.security.TokenProvider;
import ggauthserver.service.ConfirmationService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.validation.Valid;
import java.net.URI;
import java.util.Optional;
import java.util.Random;

@RestController
@RequestMapping("/auth")
public class AuthController {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private BCryptPasswordEncoder pincodeEncoder;

    @Autowired
    private TokenProvider tokenProvider;

    @Autowired
	private ConfirmationService confirmationService;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getEmail(),
                        loginRequest.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = tokenProvider.createToken(authentication);
        return ResponseEntity.ok(new AuthResponse(token));

    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignUpRequest signUpRequest) {
        
        if(userRepository.existsByEmail(signUpRequest.getEmail())) {
            throw new BadRequestException("Email address already in use.");
        }

        //Creating user's account
        User user = new User();
        user.setName(signUpRequest.getName());
        user.setEmail(signUpRequest.getEmail());
        user.setPassword(signUpRequest.getPassword());
        user.setProvider(AuthProvider.local);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user = confirmationService.initiateConfirmation(user);
        User result = userRepository.save(user);

        URI location = ServletUriComponentsBuilder
            .fromCurrentContextPath().path("/console/me")
            .buildAndExpand(result.getId()).toUri();

        return ResponseEntity.created(location)
            .body(new ApiResponse(true, "User registered successfully"));

    }

    @PostMapping("/checkpincode")
    public ResponseEntity<?> checkPincode(@Valid @RequestBody PincodeRequest pincodeRequest) {
        Optional<User> userOptional = userRepository.findByEmail(pincodeRequest.getEmail());
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            if (pincodeEncoder.matches(pincodeRequest.getPincode(), user.getPincodeEmail())) {
                logger.info("pincodeHash match in DB !");
                userRepository.setEmailVerifiedById(true, user.getId());
                return ResponseEntity.ok().body(new ApiResponse(true, "Pincode match !"));
            } else {
                return ResponseEntity.ok().body(new ApiResponse(false, "Pincode does not match !"));
            }
        } else {
            return ResponseEntity.ok().body(new ApiResponse(false, "User could not be found !"));
        }
    }

    @PostMapping("/newpincode")
    public ResponseEntity<?> newPincode(@Valid @RequestBody NewPincodeRequest newPincodeRequest) {
        Optional<User> userOptional = userRepository.findByEmail(newPincodeRequest.getEmail());
        if (userOptional.isPresent()) {
            User user = userOptional.get();   
            confirmationService.updatePincode(user);
            return ResponseEntity.ok().body(new ApiResponse(true, "pincode updated !"));
        } else {
            return ResponseEntity.ok().body(new ApiResponse(false, "User could not be found !"));
        }
    }

}