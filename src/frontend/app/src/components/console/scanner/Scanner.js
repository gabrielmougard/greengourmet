import React, { useEffect } from "react";
import config from "../../../libs/scanner/configHome.json";
import { detectionThreshold } from "../../../libs/scanner/threshold";
import Quagga from "quagga";

import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';


//CSS
import './Scanner.css'

const Scanner = props => {
    const [drawerState, setDrawerState] = React.useState(false);

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
            //call the saga here for getting the content of the decoded barcode
            //TODO :
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



  return (
    // If you do not specify a target,
    // QuaggaJS would look for an element that matches
    // the CSS selector #interactive.viewport
    <>
    <div id="interactive" className="viewport"></div>
    <Drawer anchor={"bottom"} open={drawerState} onClose={toggleDrawer(false)}>
    </Drawer>
    </>
  );
};

export default Scanner;
