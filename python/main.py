import numpy as np
import cv2


def showInfo(lineHeight, threshold, setCounter):
    print('Starting set: '+ str(setCounter))
    print('Line hieght: '+str(lineHeight) + ' | Higher number lowers bar')
    print('Threshold: '+str(threshold)+ ' | How many frames you need to be up or down the line for it to count')
    print('Press "ESC" to quit')\

def putText(img, text, color, x, y):
    text_size = cv2.getTextSize(text, cv2.FONT_HERSHEY_PLAIN, 1, 1)[0]
    cv2.rectangle(img, (x, y), (x + text_size[0] + 3, y + text_size[1] + 4), color, -1)
    cv2.putText(img, text, (x, y + text_size[1] + 4), cv2.FONT_HERSHEY_PLAIN, 1, (255, 255, 255), 1)

def run(lineHeight, threshold, setCounter):
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
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        faces = face_cascade.detectMultiScale(gray, 1.1, 4)
        for (x, y, w, h) in faces:
            x2 = x+w
            y2 = y+w
            y3 = int((y+y2)/2)

            if y3 < lineHeight:
                statusUp.append(True)
                statusDown.append(False)
                if all(statusUp[-threshold:]):
                    if not up:
                        repCounter += 1
                        up = True
                        print('UP')
                        print(repCounter)
                    #print(statusUp[-threshold:])
            else:
                statusUp.append(False)
                statusDown.append(True)
                if all(statusDown[-threshold:]) and up:
                    up = False
                    print('Down')
                    #print(statusDown[-threshold:])
            #cv2.rectangle(img, (x, y), (x2, y2), (255, 0, 0), 2)
            img = cv2.line(img,(0,y3),(vidWidth,y3),(0,0,0),1)

        if repCounter == setCounter:
            print('Finished set',setCounter)
            repCounter = 0
            setCounter -= 1
            print('Starting set', setCounter)

        if setCounter == 0:
            break

        img = cv2.line(img,(0,lineHeight),(vidWidth,lineHeight),(0,0,255),1)
        #img = cv2.putText(img, 'Rep Counter: '+str(repCounter), (100,300), cv2.FONT_HERSHEY_SIMPLEX,1,thickness=1,color=[255,255,255])
        #img = cv2.putText(img, 'Set Counter: '+str(setCounter), (100,400), cv2.FONT_HERSHEY_SIMPLEX,1,thickness=1,color=[255,255,255])
        putText(img, 'Rep Counter: '+str(repCounter),(0,0,0), 100,350)
        putText(img, 'Set Counter: '+str(setCounter),(0,0,0), 100,400)
        if up:
            putText(img, 'Status: Up',(0,0,0), 250,400)
        else:
            putText(img, 'Status: Down',(0,0,0), 250,400)


        cv2.imshow('video',img)

        k = cv2.waitKey(30) & 0xff
        if k == 27: # press 'ESC' to quit
            break

    cap.release()
    cv2.destroyAllWindows()

def runOnSingleFrame(img,lineHeight, threshold, setCounter, face_cascade, vidWidth, statusUp, statusDown, up, repCounter, startTimer):
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    faces = face_cascade.detectMultiScale(gray, 1.1, 4)
    for (x, y, w, h) in faces:
        x2 = x+w
        y2 = y+w
        y3 = int((y+y2)/2)

        if y3 < lineHeight:
            statusUp.append(True)
            statusDown.append(False)
            if all(statusUp[-threshold:]):
                if not up:
                    if startTimer:
                        startTimer = False
                    repCounter += 1
                    up = True
                    print('UP')
                    print(repCounter)
                #print(statusUp[-threshold:])
        else:
            statusUp.append(False)
            statusDown.append(True)
            if all(statusDown[-threshold:]) and up:
                up = False
                print('Down')
                #print(statusDown[-threshold:])
        #cv2.rectangle(img, (x, y), (x2, y2), (255, 0, 0), 2)
        img = cv2.line(img,(0,y3),(vidWidth,y3),(0,0,0),1)

    if repCounter == setCounter:
        print('Finished set',setCounter)
        repCounter = 0
        setCounter -= 1
        print('Starting set', setCounter)
        startTimer = True

    #if setCounter == 0:
        #break

    img = cv2.line(img,(0,lineHeight),(vidWidth,lineHeight),(0,0,255),1)
    #img = cv2.putText(img, 'Rep Counter: '+str(repCounter), (100,300), cv2.FONT_HERSHEY_SIMPLEX,1,thickness=1,color=[255,255,255])
    #img = cv2.putText(img, 'Set Counter: '+str(setCounter), (100,400), cv2.FONT_HERSHEY_SIMPLEX,1,thickness=1,color=[255,255,255])
    putText(img, 'Rep Counter: '+str(repCounter),(0,0,0), 100,350)
    putText(img, 'Set Counter: '+str(setCounter),(0,0,0), 100,400)
    if up:
        putText(img, 'Status: Up',(0,0,0), 250,400)
        position = 'Up'
    else:
        putText(img, 'Status: Down',(0,0,0), 250,400)
        position = 'Down'

    return img, statusUp, statusDown, up, setCounter, repCounter, position, startTimer


    '''
    Para eliminar los falsos positivos guardo las coordenadas del centro de la cara y solo grafico las que cambiaron dentro de 
    cierto threshold. Las coordenadas del centro de la cara son x:(x+x2)/2  y:(y+y2)/2
    '''
if __name__ == '__main__':
    lineHeight = 300 #Higher number lowers line
    threshold  = 10 #How many frames the point needs to be lower or higher than the line
    setCounter = 3
    run(lineHeight,threshold,setCounter)