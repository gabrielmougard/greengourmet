package ggauthserver.repository;

import ggauthserver.model.User;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    Boolean existsByEmail(String email);

    @Modifying
    @Transactional
    @Query("update User u set u.pincodeEmail = ?1 where u.id = ?2")
    void setPincodeEmailById(String pincode, Long id);

    @Modifying
    @Transactional
    @Query("update User u set u.emailVerified = ?1 where u.id = ?2")
    void setEmailVerifiedById(Boolean emailVerified, Long id);

}