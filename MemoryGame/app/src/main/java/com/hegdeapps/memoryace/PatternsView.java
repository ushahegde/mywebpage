package com.hegdeapps.memoryace;

import android.content.Context;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Paint;
import android.os.Handler;
import android.util.AttributeSet;
import android.util.Log;
import android.view.MotionEvent;
import android.view.SurfaceHolder;
import android.view.SurfaceView;

import java.util.Random;

public class PatternsView extends SurfaceView implements SurfaceHolder.Callback,Runnable{

    int mTextSize;
    private int mNumCells;
    private int mCanvasHeight;
    private int mCanvasWidth;
    private Random mRandom;
    private Handler mHandler;

    int mNumRows=3;




    final SurfaceHolder mHolder;
    private  Thread patternThread=null;
    private  volatile boolean  running;
    final Paint mPaint;
    final PatternsActvt activity;
    private boolean paused = false;

    public PatternsView(Context context,AttributeSet attrs) {
        super(context,attrs);
        activity = (PatternsActvt)context;
        mPaint = new Paint();
        mHolder = getHolder();
        mHolder.addCallback(this);

    }

    @Override
    public boolean onTouchEvent(  MotionEvent event) {

        float x,y;
        int eventId = event.getAction();
        if(eventId==MotionEvent.ACTION_DOWN){
            x = event.getX();
            y = event.getY();
            activity.processTouchedCell(x,y);
        }

			/*int cellIndex = activity.searchForCell(x,y);
			if(cellIndex!=-1){
				boolean isFilled = activity.mCellList.get(cellIndex).isFilled();

				if(isFilled){
					activity.mCellList.get(cellIndex).setOpened(true);
					mCount++;
					if(mCount==mNumRows){
						mPatView.showWinMessage();
						createWinDelay(2000);

					}

				}else{//wrong block pressed
					mPatView.showErrorMessage();
					createErrDelay(2000);


				}

			}*/
        return true;

    }

	/*	public void showWinMessage() {
			 int height = this.getHeight();
			 int width = this.getWidth();
			 int textSize = 40;
			 mPaint.setTextSize(textSize);
			 float x = width/2 - 10;
			 float y = height/2 - 10;
			 //TODO change these two using text sizes
			 Canvas c = mHolder.lockCanvas();
			 mPaint.setColor(Color.RED);
			 c.drawColor(Color.WHITE);
			 c.drawText("Next Level", x, y, mPaint);
			 mHolder.unlockCanvasAndPost(c);
			// activity.createDelay(4000, Messages.CONTINUE_WITH_NEXT_LEVEL);
		}
*/
	/*	public void showErrorMessage() {
			 int height = this.getHeight();
			 int width = this.getWidth();
			 int textSize = 40;
			 float x = width/2 - 10;
			 float y = height/2 - 10;
			 mPaint.setTextSize(mTextSize);
			 //TODO change these two using text sizes
			 Canvas c = mHolder.lockCanvas();
			 mPaint.setColor(Color.RED);
			 c.drawColor(Color.WHITE);
			 c.drawText(" Lost the game", x, y, mPaint);
			 mHolder.unlockCanvasAndPost(c);
			 mTextSize+=2;

			// activity.programLogic();

		}*/

    @Override
    public void surfaceChanged(SurfaceHolder holder, int format, int width,
                               int height) {
        // TODO Auto-generated method stub

    }

    @Override
    public void surfaceCreated(SurfaceHolder holder) {

        activity.startGame();

    }

    @Override
    public void surfaceDestroyed(SurfaceHolder holder) {
        // TODO Auto-generated method stub

    }
    public void pause(){
        running = false;
        while(true){
            try {
                patternThread.join();
                return;
            } catch (InterruptedException e) {
                //continue
            }

        }


    }

    public void resume(){
        patternThread = new Thread(this);
        running = true;
        patternThread.start();

    }

    @Override
    public void run() {

        synchronized (patternThread) {
            while (running) {
                if (!isPaused()) {
                    if (mHolder.getSurface().isValid()) {

                        Canvas c = mHolder.lockCanvas();
                        mPaint.setColor(Color.MAGENTA);
                        activity.drawSurface(c, mPaint);

                        mHolder.unlockCanvasAndPost(c);
                        try {
                            patternThread.wait(100);
                         //   Thread.sleep(100);
                        } catch (InterruptedException e) {
                            Log.d("Mem pattern", e.getMessage());
                        }
                    }

                }
            }
        }
    }

    public boolean isPaused() {
        return paused;
    }

    public void setPaused(boolean paused) {
        this.paused = paused;

    }


}
