package com.hegdeapps.memoryace;
import android.content.Context;
import android.content.SharedPreferences;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Paint;
import android.graphics.Rect;
import android.graphics.Typeface;
import android.media.AudioManager;
import android.media.MediaPlayer;
import android.media.SoundPool;
import android.os.Bundle;
import android.os.Handler;
import android.preference.PreferenceManager;
import android.support.v7.app.AlertDialog;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.View;
import android.widget.ImageButton;
import android.widget.TextView;
import android.widget.Toast;

/*import com.google.android.gms.ads.AdRequest;
import com.google.android.gms.ads.AdView;*/

import java.util.ArrayList;
import java.util.List;
import java.util.Random;


public class PatternsActvt extends AppCompatActivity {
 
	private static final int SURFACE_VIEW_PADDING = 5;

	private static final int DELAY_WIN = 2000;

	private static final int PADDING = 10;
    private static final String STR_LEVEL = "Level" ;
    private static final String STR_CELL_LIST ="CellList" ;
    private static final String STR_SCORE = "Score";

    private PatternsView mPatView;
	public List<Cell> mCellList;

	private int mNumRows=2;
	private int mNumCols;
	

	private Random mRandom;

	private int  mMode=PatternConstants.CREATING;

	private Handler mHandler;

	private Paint mPaint;

	private String mTextMessage;

	private MediaPlayer mMediaPlayer;

	private int mScore=0;

	private int mCount=0;

	private int  mLevel=1;
	
	private final int mMaxLevel = 12;
	
	private int mFilledCells=2;
	
	private final int[][] mArrLevelsAndRows = { {2,2},{2,3},{3,3},{3,4},{3,5},{4,4},{4,5},{4,6},{5,5},{5,6},
			{5,7},{6,6},{6,7},{6,8},{7,7},{7,8},{7,9}};

	private TextView tvScore;
    private SoundPool mSoundPool;
    private boolean mSoundPoolLoaded;
    private int mSoundIDCorrect;
    private int mSoundIDWrong;
    private boolean mAdLoaded;
    private ImageButton btnSound;
    private boolean mCellsCreated=false;
    private TextView  tvHighScore;


    @Override
    protected void onSaveInstanceState(Bundle outState) {
        super.onSaveInstanceState(outState);
        outState.putInt(STR_LEVEL, mLevel);
        outState.putInt(STR_SCORE,mScore);
     //   outState.putSerializable(STR_CELL_LIST,mCellList);
    }

    @Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.patterns);
		mPatView = (PatternsView) findViewById(R.id.patview);
		mCellList = new ArrayList<Cell>(); 
		mHandler = new Handler();
		mPaint = new Paint();

		tvHighScore = findViewById(R.id.highscore);
		tvScore = (TextView)findViewById(R.id.score);
        Typeface evilDead = Typeface.createFromAsset(getAssets(),"evildead.ttf");
        tvScore.setTypeface(evilDead);

        tvHighScore.setTypeface(evilDead);
        int highScore = getHighScore();
        tvHighScore.setText("High Score : "+highScore);

        ImageButton btnHow = findViewById(R.id.btnHow);
        btnHow.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                showHowToDialog();
            }
        });

        mSoundPool =  new SoundPool(10, AudioManager.STREAM_MUSIC, 0);
        mSoundPool.setOnLoadCompleteListener(new SoundPool.OnLoadCompleteListener() {
            @Override
            public void onLoadComplete(SoundPool soundPool, int sampleId,
                                       int status) {
                mSoundPoolLoaded = true;
            }
        });

        mSoundIDCorrect = mSoundPool.load(this, R.raw.success, 1);
        mSoundIDWrong = mSoundPool.load(this,R.raw.beep,1);
        setVolumeControlStream(AudioManager.STREAM_MUSIC);

       if(savedInstanceState!=null){
            mLevel = savedInstanceState.getInt(STR_LEVEL);
            mScore = savedInstanceState.getInt(STR_SCORE);
          /*  mCellList =(ArrayList<Cell>) savedInstanceState.getSerializable(STR_CELL_LIST);
            mCellsCreated = true;*/
           Toast.makeText(this,"Level Restarted..",Toast.LENGTH_SHORT).show();
        }
    }

    private void showHowToDialog() {
        AlertDialog.Builder builder = new AlertDialog.Builder(this,R.style.Theme_AppCompat_Light_Dialog);
        builder.setMessage("Click on the pattern correctly.\nThat is click on the cells which were filled. \nWrong click will end the game.\n ");
        builder.show();
    }


    /*private void loadAd() {
        AdView adView = (AdView) findViewById(R.id.adView);
        if (adView != null) {
            AdRequest.Builder adRequestBuilder = new AdRequest.Builder().
                    addTestDevice(AdRequest.DEVICE_ID_EMULATOR)
                    .addTestDevice("2CE5F62607304EDDE0263F4B6544B01C");
            AdRequest adRequest = adRequestBuilder.build();

            // Start loading the ad in the background.
            adView.loadAd(adRequest);
        }


    }
	*/
	 
	 void createModeDelay(){
		 mHandler.postDelayed(new Runnable() {

             @Override
             public void run() {
                 mMode = PatternConstants.MODE_TEST;

             }
         }, PatternConstants.DELAY_MODE_CHANGE);
	 }
	 
	/*  void createDelay(int milliseconds,final int nextStep) {
		  mHandler.postDelayed(new Runnable(){

			@Override
			public void run() {
				
				if(nextStep==Constants.GAME_TEST_MODE){
				 mMode = TEST;
				}
				else if(nextStep==Constants.SHOW_REPLAY_DIALOG){
					
					 programLogic();
				}
				else if(nextStep==Constants.CONTINUE_WITH_NEXT_LEVEL){
					  
					 mNumRows++;
					programLogic();
				}
				  
			}
			 
		 },milliseconds);
		    
		  
		
	}*/

    /**
     * we are just showing message here. Can not recreate the level uh2/11/16
     * @param
     */
   /* @Override
    public void onConfigurationChanged(Configuration newConfig) {
        super.onConfigurationChanged(newConfig);
     //   if(newConfig.orientation== Configuration.ORIENTATION_LANDSCAPE){
            Toast.makeText(this,"Level Restarted..",Toast.LENGTH_SHORT).show();
        }
   // }*/

    private void createFilledCells( ){
		mRandom = new Random();
		int numCells = mNumRows*mNumCols;
		 
		ArrayList<Integer> nList = new ArrayList<Integer>();
		for(int i =0;i<numCells;i++){
			nList.add(i,i);
		}
		ArrayList<Integer>selList = new ArrayList<Integer>();
		int n2=numCells;

            for (int i = 0; i < mFilledCells; i++) {//change to mNumCols and test
                int randomNum = mRandom.nextInt(n2);
                int k = nList.get(randomNum);
                nList.remove(randomNum);
                selList.add(k);
                n2--;

            }
            //Let us clean evertthing first
            for (int i = 0; i < numCells; i++) {
                mCellList.get(i).setFilled(false);
                mCellList.get(i).setOpened(false);
            }
            //Now we have nr numbers which must be filled
            for (int i = 0; i < mFilledCells; i++) {
                int num = selList.get(i);
                mCellList.get(num).setFilled(true);
            }

		
	}

	public void createCells() {
		//int numRows = mNumRows;
		//int numCells = numRows*numRows;
		mCellList.clear();
		int canvasHeight = mPatView.getHeight();//-PADDING*2;
		int cannvasWidth = mPatView.getWidth();//-PADDING*2;
		float cellWidth =  ((float)(cannvasWidth) / mNumCols);
		float cellHeight = ((float)canvasHeight )/mNumRows;//which is same as numCols
		
		
		float mX,mY=0;//PADDING;
		for (int i = 0; i < mNumRows; i++) {

			mX = 0;//PADDING;
			for (int col = 0; col < mNumCols; col++) {
				Cell c = new Cell();
				c.setWidth(cellWidth);
				c.setHeight(cellHeight);

				c.setTlX(mX);
				c.setTlY(mY);
				c.setFilled(false);
				c.setOpened(false);
				mCellList.add(c);
				mX += cellWidth;

			}
			mY += cellHeight;
		}
				
	}

	 

	 
	 

	protected void drawSurface(Canvas c,Paint paint) {
        int bgColor = Color.parseColor("#d4f2f7");//this is lightblue same as gridbg
		c.drawColor(bgColor);//getResources().getColor(R.color.darkcyan));
	//	 Log.d("com.hegdeapps.com.hegdeapps.memoryace","mMode is "+mMode);
		 if(mMode==PatternConstants.CREATING){
			 c.drawColor(getResources().getColor(R.color.lightgreen));
			 drawText(c,"Wait....");
			 return;
		 }
		 else if(mMode == PatternConstants.MODE_SHOW_TEXT){
			/*  Drawable dr = getResources().getDrawable(R.drawable.bg);
			  int canvasHeight = mPatView.getHeight();
				int cannvasWidth = mPatView.getWidth();
			 dr.setBounds(0,0,cannvasWidth,canvasHeight);
		  dr.draw(c);*/
          float textSize = getResources().getDimension(R.dimen.pattern_message_text_size)  ;
		  mPaint.setTextSize(textSize);//mPatView.mTextSize);
		  mPatView.mTextSize+=2;
		  this.drawText(c,mTextMessage);
			// mPatView.drawRectangle(c);
			 return;
		 }
		 else if (mMode == PatternConstants.MODE_DISPLAY){
			 /* Drawable dr = getResources().getDrawable(R.drawable.bg);
			 int canvasHeight = mPatView.getHeight();
				int cannvasWidth = mPatView.getWidth();
			 dr.setBounds(0,0,cannvasWidth,canvasHeight);
			 dr.draw(c); */
			 for(int i=0;i<mCellList.size();i++){
				 Cell cell1 = mCellList.get(i);
				  
				      cell1.drawCell(c, paint, true);

				 } 
		 }
		 else if (mMode == PatternConstants.MODE_TEST){
			  /*Drawable dr = getResources().getDrawable(R.drawable.bg);
			 int canvasHeight = mPatView.getHeight();
				int cannvasWidth = mPatView.getWidth();
			 dr.setBounds(0,0,cannvasWidth,canvasHeight);
			 dr.draw(c); */
			 for(int i=0;i<mCellList.size();i++){
				 Cell cell1 = mCellList.get(i);
				   
					 if(cell1.isOpened()){
						 cell1.drawCell(c,paint,true);
					 }else{
						 cell1.drawCell(c, paint, false);
					 }
						 
				 }
				 
			 } 
		 runOnUiThread(new Runnable() {

             @Override
             public void run() {
                 mPatView.invalidate();

             }
         });


	}

	 
	 
	

	private void drawText(Canvas c, String string) {
		
		 mPaint.setColor(Color.WHITE);
        if(string.contains("Level")) {
            mPaint.setTextSize(40);
            mPaint.setTextSkewX(-0.25f);
            mPaint.setShadowLayer(4,1,1,Color.DKGRAY);
        }else{
            mPaint.setTextSize(28);
        }
		 Typeface tf = Typeface.createFromAsset(getAssets(), "evildead.ttf");

		 mPaint.setTypeface(tf);

		 int height = mPatView.getHeight();
		 int width = mPatView.getWidth();
		 Rect bounds = new Rect();
		 mPaint.getTextBounds(string,0,string.length(),bounds);
		  
		 float x = width/2 - bounds.width()/2;
		 float y = height/2 - bounds.height()/2;
		 mPaint.setAntiAlias(true);
		 mPaint.setDither(true);
		 c.drawText(string, x, y, mPaint);
		
	}





	private void createErrDelay() {
		 
		 mHandler.postDelayed(new Runnable() {
				
				@Override
				public void run() {
					 
					mMode = PatternConstants.MODE_DISPLAY;
					mPatView.pause();
					PatternsActvt.this.finish();
					
				}
			}, PatternConstants.DELAY_ERROR);
		
	}



	private void createWinDelay() {
		 
		 mHandler.postDelayed(new Runnable() {
				
				@Override
				public void run() {
					mMode = PatternConstants.MODE_DISPLAY;
					
					startGame();
					
				}
			}, PatternConstants.DELAY_WIN);
		
	}



	public int  searchForCell(float x, float y) {
		float width,height;
		width = mCellList.get(0).getWidth();
		height= mCellList.get(0).getHeight();
		int numCells = mCellList.size();
		  for(int i=0;i<numCells;i++){
			  Cell cell1 = mCellList.get(i);
			  float cellX,cellY;
			  cellX = cell1.getTlX();
			  cellY = cell1.getTlY();
			  if(x>=cellX && x<=cellX+width){
				  if(y>=cellY && y<=cellY+height){
					  return i;
				  }
			  }
		  }
		  return -1;
		
	}
	
	@Override
	public void onPause(){
		mPatView.pause();
		 
            mSoundPool.autoPause();

			if(isFinishing()){
				saveScoreToPreferences();
			}

		 
		super.onPause();
	}

	private int getHighScore(){
        SharedPreferences pref = PreferenceManager
                .getDefaultSharedPreferences(this);
         int score = pref.getInt("pattern_score",0);
         return score;
    }
	private void saveScoreToPreferences() {
		SharedPreferences pref = PreferenceManager
				.getDefaultSharedPreferences(this);
		int highScore = pref.getInt("pattern_score",0);
		if(mScore>highScore) {
            SharedPreferences.Editor editr = pref.edit();
            editr.putInt("pattern_score", mScore);
            editr.commit();
        }
		
	}





	@Override
	public void onResume(){

		mPatView.resume();
     /*   if(!mAdLoaded){
            loadAd();
            mAdLoaded = true;
        }*/
	   super.onResume();
	}





	public void startGame() {

		if(mLevel>=mMaxLevel){
			mMode = PatternConstants.MODE_SHOW_TEXT;
			 mTextMessage = "Game Completed.";
			 playErrorSound();
			 return;
			 
		}
        int highScore = getHighScore();
        tvHighScore.setText("High Score : "+highScore);
		 mNumRows = mArrLevelsAndRows[mLevel-1][0];
		 mNumCols = mArrLevelsAndRows[mLevel-1][1];
		 
		 mMode = PatternConstants.MODE_CREATING;
         mFilledCells = mLevel+1;
             createCells();
             createFilledCells();

		 mMode = PatternConstants.MODE_DISPLAY;
		 mCount = 0;
		 createModeDelay();

	}





	public void processTouchedCell(float x, float y) {
		int cellIndex = searchForCell(x, y);

		if(cellIndex ==-1){
			Log.d("com.hegdeapps.memoryace","some error");
			return;
		}
		Cell cell1 = mCellList.get(cellIndex);
        if (cell1.isFilled()) {
            //Correct cell is tapped
            mCellList.get(cellIndex).setOpened(true);
            playCorrectSound();
            incrementScoreAndCount();

            if (mCount == mFilledCells) {
                processLevelCleared();
            }
        } else {
            processWrongCellPressed();
        }
		
	}





	/*private void saveScore() {
		// TODO Auto-generated method stub
		
	}
*/




	private void processLevelCleared() {
		 mMode = PatternConstants.MODE_SHOW_TEXT;
		 mLevel++;
		// mNumRows++;
		 mFilledCells++;
		 mPatView.mTextSize = 18;
		 createWinDelay();

		 mTextMessage = "Level "+ String.valueOf(mLevel-1)+" Completed";
		 
		 
		// startGame();
		
	}





	private void playCorrectSound() {
		CommonMethods.playSound(this,mSoundPool,mSoundIDCorrect);
	}





	private void incrementScoreAndCount() {
		mScore +=100;
		mCount++;
		tvScore.setText(String.valueOf(mScore));
		
	}
	private void processWrongCellPressed() {
		 mMode = PatternConstants.MODE_SHOW_TEXT;
		 int highScore = getHighScore();
		 if(mScore>highScore){
		     mTextMessage = "New High Score!!.\nYour score is "+mScore;
         }else {
             mTextMessage = "Game Over\nYour score is "+mScore;
         }
		 mPatView.mTextSize = 18;
		 
		 playErrorSound();
		 createErrDelay();
	}





	private void playErrorSound() {
        CommonMethods.playSound(this,mSoundPool,mSoundIDWrong);
		
	}





	private boolean isSilentMode() {
		
		    boolean silent = false;
	          AudioManager  adiManager = (AudioManager) getSystemService(Context.AUDIO_SERVICE);
	         
	        if (adiManager != null) {
	            silent = (adiManager.getRingerMode() != AudioManager.RINGER_MODE_NORMAL);
	        }
	        return silent;
	}

 
}
	 /* public void drawRectangle(Canvas c) {
            Paint p = new Paint();
            p.setColor(Color.WHITE);
            p.setStyle(Paint.Style.STROKE);
            p.setStrokeWidth(3);
            Rect rectBnds=new Rect();
            c.getClipBounds(rectBnds);
            c.drawRect(rectBnds.left,rectBnds.top,rectBnds.right,rectBnds.bottom,p);


         }*/
	 
	 class PatternConstants{
		   public static final int DELAY_WIN = 2000;
		public static final int DELAY_ERROR = 2000;
		public static final int MODE_SHOW_TEXT = 4;
		protected static final int MODE_TEST = 3;
		public static final int MODE_DISPLAY = 2;
		public static final int DELAY_MODE_CHANGE=500 ;
		public static final int MODE_CREATING = 1;
		public static final int CONTINUE_WITH_NEXT_LEVEL = 3;
		static final int GAME_TEST_MODE = 1;
		    static final int SHOW_REPLAY_DIALOG = 2;
		    static final int  DISPLAY = 10;
			protected static final int  TEST = 20;
			static final int CREATING = 30;
	 }


