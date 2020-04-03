import React, { useEffect } from "react";
import config from "../../../libs/scanner/configHome.json";
import { detectionThreshold } from "../../../libs/scanner/threshold";
import Quagga from "quagga";

import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

//redux
import { connect } from 'react-redux'

//CSS
import './Scanner.css'

//actions
import { sendBarcodeContent } from '../../../actions'

const backdropStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  }));


const Scanner = props => {
    const [drawerState, setDrawerState] = React.useState(false);
    const [backDropState, setBackDropState] = React.useState(false);

  useEffect(() => {
    Quagga.init(config, err => {
      if (err) {
        console.log(err, "error msg");
      }
      Quagga.start();
      return () => {
        Quagga.stop()
      }
    });

    //detecting boxes on stream
    Quagga.onProcessed(result => {
      var drawingCtx = Quagga.canvas.ctx.overlay,
        drawingCanvas = Quagga.canvas.dom.overlay;

      if (result) {
        if (result.boxes) {
          drawingCtx.clearRect(
            0,
            0,
            Number(drawingCanvas.getAttribute("width")),
            Number(drawingCanvas.getAttribute("height"))
          );
          result.boxes
            .filter(function(box) {
              return box !== result.box;
            })
            .forEach(function(box) {
              Quagga.ImageDebug.drawPath(box, { x: 0, y: 1 }, drawingCtx, {
                color: "green",
                lineWidth: 2
              });
            });
        }

        if (result.box) {
          Quagga.ImageDebug.drawPath(result.box, { x: 0, y: 1 }, drawingCtx, {
            color: "#00F",
            lineWidth: 2
          });
        }

        if (result.codeResult && result.codeResult.code) {
          Quagga.ImageDebug.drawPath(
            result.line,
            { x: "x", y: "y" },
            drawingCtx,
            { color: "red", lineWidth: 3 }
          );
        }
      }
    });

    Quagga.onDetected(detected);
  }, []);

  const detected = result => {
    if(localStorage.getItem("scanner-results")) {
        let existing = localStorage.getItem("scanner-results");
        existing = existing.split(',');
        existing.push(result.codeResult.code);

        var decoded = detectionThreshold(existing)
        if (decoded) {
            console.log("A reliable decoded value is : "+decoded);
            setBackDropState(true);
            //call the saga here for getting the content of the decoded barcode
            props.sendBarcodeContent(props.currentUser.id, decoded);
            //
        }

        localStorage.setItem('scanner-results', existing.toString());
    } else {
        let barcodes = [];
        barcodes[0] = result.codeResult.code
        localStorage.setItem("scanner-results", barcodes.toString());
    }
  };

  //detect if the scanner view is supported (if we have at least one webcam)

  //
  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
    }
    setDrawerState(open);
  }

  const classBackdrop = backdropStyles();

  const handleCloseBackdrop = () => {
      setBackDropState(false);
  }

  //if we have a response from /search
  if (props.barcodeContent) {
      setBackDropState(false); //untoggle the backdrop
      setDrawerState(true); //toggle the bottom Drawer to print the result a let the user complete it
  }

  return (
    // If you do not specify a target,
    // QuaggaJS would look for an element that matches
    // the CSS selector #interactive.viewport
    <>
    <div id="interactive" className="viewport"></div>
    <Drawer anchor={"bottom"} open={drawerState} onClose={toggleDrawer(false)}>
    </Drawer>
    <Backdrop className={classBackdrop.backdrop} open={backDropState}>
        <CircularProgress color="inherit" />
    </Backdrop>
    </>
    
  );
};

const mapStateToProps = (state) => {
    return {
        barcodeContent: state.barcodeContent,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        sendBarcodeContent: (userId, barcode) => {dispatch(sendBarcodeContent(userId, barcode))},
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Scanner);
