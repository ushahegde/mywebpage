package com.hegdeapps.memoryace;

import android.app.Dialog;
import android.content.Context;
import android.content.SharedPreferences;
//import android.graphics.Color;
import android.graphics.Typeface;
import android.media.AudioManager;
import android.media.SoundPool;
import android.os.Bundle;
import android.os.CountDownTimer;
import android.os.Handler;
import android.preference.PreferenceManager;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.Button;
import android.widget.ImageButton;
import android.widget.TextView;
import android.widget.Toast;

/*import com.google.android.gms.ads.AdRequest;
import com.google.android.gms.ads.AdView;*/


import java.util.ArrayList;
import java.util.Calendar;
import java.util.Random;
import java.util.Timer;
import java.util.TimerTask;

/**
 * Simon or repeat after me. Glowing cells with sounds in random pattern User shd repeat pattern.
 * Created by hegde on 07-06-2016.
 */
public class SimonActivity  extends AppCompatActivity implements View.OnClickListener {

    private static final int LEVEL_COMPLETED =1 ;
    private static final int GAME_OVER = 2;
    private static final String STR_CELL_ON_LIST = "CellOnList";
    private static final java.lang.String STR_SCORE ="Score" ;
    private static final java.lang.String STR_LEVEL = "Level";
    private static final String STR_TIMER_COMPLETED ="GameDisplayTimerCompleted" ;
    private static final long ON_INTERVAL =500 ;
    private ArrayList<SimonCell> mCellList;
    private SoundPool mSoundPool;
  /*  private int mSoundIDC;
    private int mSoundIDD;
    private int mSoundIDE;
    private int mSoundIDF;*/
    private boolean mSoundPoolLoaded;
    private int mLevel=1;
    private ArrayList<Integer> mCellOnList;
    private final SimonCell[] mImgView = new SimonCell[4];
    private int count=0;
    private int mCellNum;
    private int mCurrentCellIndex=0;
    private Timer mTimer;
    private TimerTask mTimerTask;
    private final int[] mSoundID=new int[4];
    private float mSndVolume;
    private int mPrevSoundStreamID;
    private int mScore=0;
    private CountDownTimer mTimerForClick;
    private ImageButton btnSound;
    private boolean mSoundOn=true;
    private Handler mHandler;
    private boolean mFirstCell=true;
    private CountDownTimer mCountdownTimer;
    private boolean mTimerTaskCompleted=true;
    private boolean mInstancesSaved=false;
    private TextView tvHighScore;
    private Typeface mTfEvilDead;
    private TextView tvScore;

    @Override
    protected void onSaveInstanceState(Bundle outState) {
        super.onSaveInstanceState(outState);
        if(mCellOnList!=null) {
          int arr[] = new int[mCellOnList.size()];
            for (int i = 0; i < mCellOnList.size(); i++) {
                arr[i] = mCellOnList.get(i);
            }
            outState.putIntArray(STR_CELL_ON_LIST, arr);
            outState.putInt(STR_LEVEL, mLevel);
            outState.putInt(STR_SCORE, mScore);
            /*outState.putBoolean(STR_TIMER_COMPLETED, mTimerTaskCompleted);*/
        }
    }

    public void onCreate(Bundle savedInstanceState){
        super.onCreate(savedInstanceState);
        setContentView(R.layout.simonactvt2);
        mImgView[0]=  (SimonCell)findViewById(R.id.cell1);
        mImgView[1] = (SimonCell)findViewById(R.id.cell2);
        mImgView[2] = (SimonCell)findViewById(R.id.cell3);
        mImgView[3] = (SimonCell)findViewById(R.id.cell4);
        mImgView[0].setCellType(SimonCell.CELL_TYPE_GREEN);
        mImgView[1].setCellType(SimonCell.CELL_TYPE_RED);
        mImgView[2].setCellType(SimonCell.CELL_TYPE_YELLOW);
        mImgView[3].setCellType(SimonCell.CELL_TYPE_BLUE);
        for(int i = 0;i<3;i++){
            mImgView[i].setEnabled(false);
        }

        final ImageButton btnStart = findViewById(R.id.btnstart);
        btnStart.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                startGame();
                btnStart.setVisibility(View.INVISIBLE);
            }
        });

        for(int i=0;i<4;i++){
            mImgView[i].setOnClickListener(this);
            mImgView[i].setOff();
        }

        initializeSoundPools();

        if(savedInstanceState!=null){
            mInstancesSaved = true;
           int []arr = savedInstanceState.getIntArray(STR_CELL_ON_LIST);
            if(arr==null ||arr.length==0){
                return;//do we use multiple exit points??
            }
            mCellOnList = new ArrayList<Integer>();
            for (int anArr : arr) {
                mCellOnList.add(anArr);
            }
            mScore = savedInstanceState.getInt(STR_SCORE);
            mLevel = savedInstanceState.getInt(STR_LEVEL);
            mTimerTaskCompleted = savedInstanceState.getBoolean(STR_TIMER_COMPLETED);
            ImageButton btn =   findViewById(R.id.howto);
            btn.setOnClickListener(this);
            btnStart.setVisibility(View.INVISIBLE);
            startGame();
      //      loadAd();
           // if(!mTimerTaskCompleted){

             //   glowCells2();
            //}else{
            //    initializeSoundPools();
           // }
        }/*else {

            initializeSoundPools();
            //loadAd();
         *//*   Button btn = (Button) findViewById(R.id.howto);
            btn.setOnClickListener(this);*//*
        //    startGame();
        }*/
        int highScore = getHighScoreFromPref();
        tvHighScore = findViewById(R.id.highscore);
        tvHighScore.setText("High score\n"+highScore);

        mTfEvilDead = Typeface.createFromAsset(getAssets(),"evildead.ttf");
        tvHighScore.setTypeface(mTfEvilDead);

        tvScore = findViewById(R.id.score);
        tvScore.setTypeface(mTfEvilDead);
        tvScore.setText("Score\n0");
        tvScore.setTypeface(mTfEvilDead);
    }

    private int getHighScoreFromPref() {
        SharedPreferences pref = PreferenceManager.getDefaultSharedPreferences(this);
        int score = pref.getInt(Constants.SIMON_GAME_MAX_SCORE,0);
        return score;
    }

    @Override
    protected void onResume() {
        super.onResume();
        if(mSoundPool!=null){
            mSoundPool.autoResume();
        }
        else{
            initializeSoundPools();
        }
      //  mSoundPool.autoResume();
    }

   /* private void loadAd() {
        AdView adView = (AdView) findViewById(R.id.adView);
        if (adView != null) {
            AdRequest.Builder adRequestBuilder = new AdRequest.Builder().
                    addTestDevice(AdRequest.DEVICE_ID_EMULATOR)
                    .addTestDevice("2CE5F62607304EDDE0263F4B6544B01C");
            AdRequest adRequest = adRequestBuilder.build();

            // Start loading the ad in the background.
            adView.loadAd(adRequest);
        }
    }*/

    @Override
    protected void onDestroy() {
        super.onDestroy();
        if(mSoundPool!=null) {
            mSoundPool.release();
            mSoundPool = null;
        }
    }

    @Override
    protected void onStop() {
        super.onStop();
        if(mPrevSoundStreamID!=0){
            mSoundPool.stop(mPrevSoundStreamID);
        }
        if(mCountdownTimer!=null ){
            mCountdownTimer.cancel();
        }
        if(mTimer!=null){
            mTimer.cancel();
        }

    }

    private void initializeSoundPools(){
        if(mSoundPool==null){
            mSoundPool = new SoundPool(50, AudioManager.STREAM_MUSIC, 0);

            mSoundID[0] = mSoundPool.load(this, R.raw.dnote, 1);
            mSoundID[1] = mSoundPool.load(this, R.raw.enote, 1);
            mSoundID[2] = mSoundPool.load(this, R.raw.fnote, 1);
            mSoundID[3] = mSoundPool.load(this, R.raw.gnote, 1);
            mSoundPool.setOnLoadCompleteListener(new SoundPool.OnLoadCompleteListener() {
                @Override
                public void onLoadComplete(SoundPool soundPool, int sampleId,
                                           int status) {
                    mSoundPoolLoaded = true;
                   /* if(!mTimerTaskCompleted && mInstancesSaved){
                        glowCells2();
                    }
                     if( (!mInstancesSaved) && sampleId==mSoundID[3]   ){

                        glowCells2();
                    }*/

                }
            });
            AudioManager audioManager = (AudioManager) this.getSystemService(Context.AUDIO_SERVICE);
            assert audioManager != null;
            float actualVolume = (float) audioManager
                    .getStreamVolume(AudioManager.STREAM_MUSIC);
            float maxVolume = (float) audioManager
                    .getStreamMaxVolume(AudioManager.STREAM_MUSIC);
            mSndVolume = actualVolume / maxVolume;
            setVolumeControlStream(AudioManager.STREAM_MUSIC);
        }
    }
    private void startGame() {
        SharedPreferences pref = PreferenceManager.getDefaultSharedPreferences(this);
       // boolean showHelp = pref.getBoolean("SHOW_HELP_SIMON", true);
       /* Button btnHowTo = (Button)findViewById(R.id.howto);
        if(!showHelp){
            btnHowTo.setVisibility(View.INVISIBLE);
        }else{
            btnHowTo.setVisibility(View.VISIBLE);
        }*/
        Random rnd = new Random(Calendar.getInstance().getTimeInMillis());
        if(mCellOnList==null) {
            mCellOnList = new ArrayList<Integer>();
        }
        for(int i = 0;i<3;i++){
            mImgView[i].setEnabled(true);
        }
    //    mCellOnList.clear();

        //      for(int i=1;i<=mLevel;i++){
            int num = rnd.nextInt(4);
            mCellOnList.add(num);
     //   }
          /* if(mSoundPool==null) {



        }
*/
       // glowCells2();
       if(mSoundPoolLoaded){
           glowCells2();
       }
    }

    /*private void glowCells() {
        int size = mCellOnList.size();
       mCellNum = 0;
        int num = mCellOnList.get(mCellNum++);
        SimonCell cell = mImgView[num];
        cell.setOn();
        CommonMethods.playSound(this,mSoundPool,mSoundID[num]);
        startTimerforCellOff(cell);
        if(size<=1)
            return;
        CountDownTimer timer = new CountDownTimer((size-1)*1000,1000) {
            @Override
            public void onTick(long l) {
                int num = mCellOnList.get(mCellNum++);
                SimonCell cell = mImgView[num];
                cell.setOn();

                startTimerforCellOff(cell);
            }

            @Override
            public void onFinish() {

            }
        };
        timer.start();

    }
*/
    private void startTimerforCellOff(final SimonCell cell) {
        CountDownTimer timer = new CountDownTimer(ON_INTERVAL,300) {
            @Override
            public void onTick(long l) {

            }

            @Override
            public void onFinish() {
                 cell.setOff();
            }
        };
        timer.start();
    }

   /* private void createSoundIds() {
        mSoundPool =  new SoundPool(10, AudioManager.STREAM_MUSIC, 0);
        mSoundPool.setOnLoadCompleteListener(new SoundPool.OnLoadCompleteListener() {
            @Override
            public void onLoadComplete(SoundPool soundPool, int sampleId,
                                       int status) {
                mSoundPoolLoaded = true;
            }
        });

        mSoundIDC = mSoundPool.load(this, R.raw.s1, 1);
        mSoundIDD = mSoundPool.load(this,R.raw.s2,1);
        mSoundIDE = mSoundPool.load(this,R.raw.s3,1);
        mSoundIDF = mSoundPool.load(this,R.raw.s4,1);
    }*/

  /*  private void createCells() {
        mCellList = new ArrayList<SimonCell>();
        SimonCell cell1 = new SimonCell(this,mSoundPool,SimonCell.CELL_TYPE_BLUE,mSoundIDC);
        SimonCell cell2 = new SimonCell(this,mSoundPool,SimonCell.CELL_TYPE_RED,mSoundIDD);
        SimonCell cell3 = new SimonCell(this,mSoundPool,SimonCell.CELL_TYPE_GREEN,mSoundIDE);
        SimonCell cell4 = new SimonCell(this,mSoundPool,SimonCell.CELL_TYPE_YELLOW,mSoundIDF);
        mCellList.add(cell1);
        mCellList.add(cell2);
        mCellList.add(cell3);
        mCellList.add(cell4);
        cell1.setOff();
        cell2.setOff();
        cell3.setOff();
        cell4.setOff();
    }

  */  @Override
    public void onClick(View view) {
        int id = view.getId();
      /* We are no longer using it
        if(id==R.id.soundonoff){
            processSoundButton();
        }*/

        switch(id) {
            case R.id.cell1:
                processCellClicked(0, (SimonCell) view);

                break;
            case R.id.cell2:
                processCellClicked(1, (SimonCell) view);

                break;
            case R.id.cell3:
                processCellClicked(2, (SimonCell) view);

                break;
            case R.id.cell4:
                processCellClicked(3, (SimonCell) view);

                break;
            case R.id.howto:
                showHowToDialog();
                break;
        }
        }

    private void showHowToDialog() {
        final Dialog d= new Dialog(this,R.style.DialogTheme);
        d.setContentView(R.layout.simon_help_dialog);
        TextView tv =(TextView)d.findViewById(R.id.dialogmessage);
        String howTo = getResources().getString(R.string.simon_how_to_play);
        tv.setText(howTo);

        Button okButton = (Button)d.findViewById(R.id.okbutton);
        okButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                d.dismiss();
            }
        });
        d.show();
    }

   /* private void hideHelpButton() {
        Button howTo = (Button)findViewById(R.id.howto);
        howTo.setVisibility(View.INVISIBLE);
        SharedPreferences pref = PreferenceManager.getDefaultSharedPreferences(this);
        SharedPreferences.Editor edtr = pref.edit();
        edtr.putBoolean("SHOW_HELP_SIMON", false);
        edtr.commit();

    }
*/
 /*   private void processSoundButton() {
        if(mSoundOn){
            mSoundOn = false;
            btnSound.setImageDrawable(getResources().getDrawable(R.drawable.sound_on));

        }else{
            mSoundOn = true;
            btnSound.setImageDrawable(getResources().getDrawable(R.drawable.sound_off));
        }
    }*/

    private void startTimerForClick() {
        mTimerForClick  = new CountDownTimer(5000,5000) {
            @Override
            public void onTick(long l) {

            }

            @Override
            public void onFinish() {
                showToast();
            }
        };
        mTimerForClick.start();
    }

    private void showToast() {
        int numCellsLeft = mLevel - count;
        if(numCellsLeft>0){
            Toast.makeText(this,String.valueOf(numCellsLeft)+" more cells to click",Toast.LENGTH_SHORT).show();
        }
    }

    private void processCellClicked(int cellNum,SimonCell cell) {
        if(mTimerForClick!=null) {
            mTimerForClick.cancel();
        }
        cell.setOn();//glow the cell
        if(mPrevSoundStreamID!=0){
            mSoundPool.stop(mPrevSoundStreamID);
        }
        if(mSoundOn) {
            mPrevSoundStreamID = mSoundPool.play(mSoundID[cellNum], mSndVolume, mSndVolume, 1, 0, 1.0f);
        }

        startTimerforCellOff(cell);//timer for how long glow should be on.
        if(mCellOnList.get(count)!=cellNum){//did you press wrong order cell?
            showAlert("Game Over\n\nScore " + mScore, GAME_OVER);
            return;
        }


        count++;
        if(count==mLevel){//all cells pressed. Level cleared
            mLevel++;count=0;
            mScore+=1000;
            showScore();
            saveScoreInPref();
            showAlert("LEVEL " + String.valueOf(mLevel-1)+" COMPLETED\n\nSCORE "+mScore, LEVEL_COMPLETED);
        }

    }

    private void showScore() {
         tvScore = (TextView)findViewById(R.id.score);
        if(tvScore!=null){
            tvScore.setText("Score\n"+String.valueOf(mScore));
        }
    }

    /**
     * Glow n cells automatically with sound
     * with a delay for each cell
     */
    void glowCells2() {
        mInstancesSaved = false;
        mCurrentCellIndex = 0;
       // int duration = 1000 * mCellOnList.size();
        if(mTimer!=null){
            mTimer.cancel();
        }
        mTimer = new Timer();
        mTimerTask = new TimerTask() {

            @Override
            public void run() {
                runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        mTimerTaskCompleted = false;
                        if(mCurrentCellIndex<mCellOnList.size()) {
                            glowOneCell(mCellOnList.get(mCurrentCellIndex));
                            mCurrentCellIndex++;
                            /*if(mCurrentCellIndex==mCellOnList.size()){
                                showTitle();
                            }*/
                        }else{
                            mTimerTaskCompleted=true;
                        }
                    }
                });
            }
        };

            mTimer.schedule(mTimerTask, 0, 700);

    }

 /*   private void showTitle() {
        TextView score = (TextView) findViewById(R.id.score);

        score.setText("Play notes again..");

    }
*/

    private void glowOneCell(Integer celIndex) {

        SimonCell cell = mImgView[celIndex];
        if(mPrevSoundStreamID!=0){
            mSoundPool.stop(mPrevSoundStreamID);
        }
        if(mSoundOn) {
            mPrevSoundStreamID = mSoundPool.play(mSoundID[celIndex], mSndVolume, mSndVolume, 1, 0, 1.0f);
        }
        cell.setOn();
        startTimerforCellOff(cell);
    }

    private void showAlert(String s,final int dlgCode) {
        SharedPreferences pref = PreferenceManager.getDefaultSharedPreferences(this);
        int maxScore = pref.getInt(Constants.SIMON_GAME_MAX_SCORE, 0);
        if(mScore >maxScore){
            s = "Congratulations.\nYour score is "+mScore+"\n New High Score!!!" ;
        }
        final Dialog d = new Dialog(this,android.R.style.Theme_Light_NoTitleBar);
        d.setContentView(R.layout.simondialog);

        TextView tv =(TextView) d.findViewById(R.id.dialogmessage);
        Typeface tpEvilDead = Typeface.createFromAsset(getAssets(),"evildead.ttf");
        tv.setTypeface(tpEvilDead);
        tv.setTextSize(24);
        tv.setText(s);

        mCountdownTimer = new CountDownTimer(1000,1000) {
            @Override
            public void onTick(long l) {

            }

            @Override
            public void onFinish() {
                d.dismiss();
                if (dlgCode == LEVEL_COMPLETED) {
                    startGame();
                } else if (dlgCode == GAME_OVER) {
                    SimonActivity.this.finish();
                }
            }
        };
        mCountdownTimer.start();
        d.show();

    }

    public SoundPool getSoundPool() {
        return mSoundPool;
    }

    private boolean saveScoreInPref() {
        SharedPreferences pref = PreferenceManager.getDefaultSharedPreferences(this);
        SharedPreferences.Editor editor = pref.edit();
        int maxScore = pref.getInt(Constants.SIMON_GAME_MAX_SCORE, 0);
        if (mScore > maxScore) {
            editor.putInt(Constants.SIMON_GAME_MAX_SCORE, mScore);
            editor.commit();
            return true;
        } else {
            return false;
        }
    }
}
