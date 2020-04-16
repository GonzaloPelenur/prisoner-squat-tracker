from flask import Flask, request
from flask_cors import CORS
from main import runOnSingleFrame, showInfo
import json
import cv2
import numpy as np
import base64

app = Flask(__name__)
CORS(app)

data = {
    'lineHeight': 200,
    'threshold': 5,
    'setCounter': 30,
    'statusUp': [],
    'statusDown': [],
    'up': True,
    'repCounter': 0,
    'img':0,
    'position': 'Up'
}

@app.route("/start", methods=['GET', 'POST'])
def start():
    print(data)
    lineHeight = data['lineHeight'] #Higher number lowers line
    threshold  = data['threshold'] #How many frames the point needs to be lower or higher than the line
    setCounter = data['setCounter']
    
    showInfo(lineHeight, threshold, setCounter)
    face_cascade = cv2.CascadeClassifier('python/Cascades/haarcascade_frontalface_default.xml')
    cap = cv2.VideoCapture(0)

    #Variables
    vidWidth = int(cap.get(3))
    statusUp = [] #True means that the point is higher than lineHeight Flase means the oposite
    statusDown = [] #True means that the point is lower than lineHeight Flase means the 
    up = True #True means up, Flase down
    repCounter = 0
    while True:
        ret, img = cap.read()
        img, statusUp, statusDown, up, setCounter, repCounter, position = runOnSingleFrame(img,lineHeight, threshold, setCounter, face_cascade, vidWidth, statusUp, statusDown, up, repCounter)
        if setCounter == 0:
            break
        
        imEncoded= cv2.imencode('.jpg', img)[1]
        #imgBase64 = base64.b64encode(buffer_img)
        #sendIm = np.copy(img).tolist()
        #-------Modify Data----------------------------------
        data['img'] = str(imEncoded)
        data['statusUp'] = statusUp
        data['statusDown'] = statusDown
        data['up'] = up
        data['setCounter'] = setCounter
        data['repCounter'] = repCounter
        data['position'] = position
        #----------------------------------------------------
        

        cv2.imshow('video',img)
        k = cv2.waitKey(30) & 0xff
        if k == 27: # press 'ESC' to quit
            break

    cap.release()
    cv2.destroyAllWindows()
    #print(imgBase64)
    return 'CACA'

@app.route("/data", methods=['GET', 'POST'])
def handle_request():
    return data

@app.route("/submitData", methods=['GET', 'POST'])
def handle_request2():
    print('Sumbit Data')
    req = request.args.get('startingSet')
    try:
        val = int(req)
        data['setCounter'] = val
        print(data)
        return 'Success'
    except Exception as e:
        print(e)
        return 'Failure'
    
    
if __name__ == "__main__":
    app.run(debug=True)