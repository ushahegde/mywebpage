package com.hegdeapps.memoryace;

import android.app.Dialog;
import android.content.Context;
import android.content.SharedPreferences;
import android.content.res.Configuration;
import android.graphics.Color;
import android.graphics.Typeface;
import android.graphics.drawable.Drawable;
import android.media.AudioManager;
import android.media.SoundPool;
import android.os.Bundle;
import android.os.CountDownTimer;
import android.os.Handler;
import android.os.Message;
import android.preference.PreferenceManager;
import android.support.v7.app.AppCompatActivity;
import android.util.DisplayMetrics;
import android.view.Display;
import android.view.LayoutInflater;
import android.view.Menu;
import android.view.MenuInflater;
import android.view.MenuItem;
import android.view.View;
import android.view.ViewGroup;
import android.view.Window;
import android.webkit.WebView;
import android.widget.AdapterView;
import android.widget.AdapterView.OnItemClickListener;
import android.widget.BaseAdapter;
import android.widget.GridView;
import android.widget.ImageView;
import android.widget.LinearLayout.LayoutParams;
import android.widget.ProgressBar;
import android.widget.TextView;

/*import com.google.android.gms.ads.AdRequest;
import com.google.android.gms.ads.AdView;*/

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.List;
import java.util.Locale;
import java.util.Random;
import java.util.Timer;
import java.util.TimerTask;

public class CardsActivity extends AppCompatActivity {

    private static final String STR_LEVEL ="Level" ;
    private static final String STR_SCORE ="Score" ;
    private static final String STR_CARD_LIST ="CardList" ;
    private static final String STR_CLEARED_CARD_LIST = "ClearedCardsList";
    private static final String STR_NUM_CARDS_REMINING ="NumberOfCardsRemaining" ;
    private int mPrevOpenCardPosition = -100;

	private static final int NUM_OF_SHUFFLES = 5;
	private static final int CLOSE_CARDS = 100;
	private static final int GOTO_NEXT_LEVEL = 10;

	private static final long GAME_TIME = 60 * 1000;

	private static final long TIME_UPDATE_INTERVAL = 1000;

	private static final int GAME_OVER = 20;

	private static final int MIN_CARDS = 8;

	private static final String STR_HIGH_SCORE = "highscore";

	private GridView gvCardGrid;
	private List<Card> mCardList;
	private int mLevel = 1;
	private CardGridAdapter mGridAdapter;
	private Random mRandom;
	private boolean mCardOpen = false;
	private int mPrevOpenCard1;
	private int mPrevOpenCard2;

	private int mScore;
	private static Handler mHandler;

	private int mNumCardsRemaining;
	//private TextView tvScore;

	private ProgressBar pbTimerBar;

	private CountDownTimer mCountDownTimer;

	private CountDownTimer mDialogCountTimer;

	private TextView tvEmpty;

/*	private AdView adView;*/

	private TextView tvTime;
	private Drawable mCardTopDrawable;
	private static int mCardWidth;
	private static int mCardHeight;
    private SoundPool mSoundPool;
    private boolean mSoundPoolLoaded;
    private int mSoundIDCorrect;
    private int mSoundIDWrong;

    private Typeface mTypefaceSlapStick;
    private boolean gridViewResized=false;
    private int mWidth;
    private int mHeight;
  //  private List<Integer> mClearCardsList;
    private List<String> mStringCardList;
    private ArrayList<Integer> mClearedList;
    private boolean mOrientationChanged=false;
    private Typeface mTypefaceEvilDead;
    private TextView tvHighScore;

    @Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.classicmemory);

	//	mClearCardsList = new ArrayList<Integer>();

	//	loadAd();


		gvCardGrid = (GridView) findViewById(R.id.cardgrid);
		//gvCardGrid.setColumnWidth(120);
	 //	gvCardGrid.setStretchMode(GridView.NO_STRETCH);

        Display dis = getWindowManager(). getDefaultDisplay();
        if(dis.getWidth()>dis.getHeight()){
            gvCardGrid.setNumColumns(7);
        }else{
            gvCardGrid.setNumColumns(5);
        }


        TextView cardTitle = (TextView)findViewById(R.id.cardtitle);
        mTypefaceEvilDead = Typeface.createFromAsset(getAssets(),"evildead.ttf");
        cardTitle.setTypeface(mTypefaceEvilDead);

		tvEmpty = (TextView) findViewById(R.id.gridempty);
     //   tvEmpty.setTextAppearance(this,android.R.style.TextAppearance_Large);

		gvCardGrid.setEmptyView(tvEmpty);

        mTypefaceSlapStick = Typeface.createFromAsset(getAssets(),
                "evildead.ttf");

		setGridViewColumnCount();
        /*tvScore = (TextView)findViewById(R.id.score);
        tvScore.setTypeface(mTypefaceEvilDead);*/
        //TODO removed score to save space in landscape
      /*  if(tvScore!=null){
		tvScore.setText( String.valueOf(mScore));
        }*/

		pbTimerBar = (ProgressBar) findViewById(R.id.time);
		pbTimerBar.setMax((int) GAME_TIME);

		tvTime = (TextView) findViewById(R.id.timeseconds);

		gvCardGrid.setOnItemClickListener(new OnItemClickListener() {

			private int mNumCardsOpen;

			@Override
			public void onItemClick(AdapterView<?> arg0, View v, int position,
					long arg3) {
                if(mNumCardsOpen>2){
                   // mHandler.sendEmptyMessage(CLOSE_CARDS);
                 //   Drawable cardTop = getResources().getDrawable(R.drawable.cardtop3);
                 //   ((ImageView)v).setImageDrawable(cardTop);
                    return;
                }
				/*((ImageView)v).setMaxWidth(50);
				((ImageView)v).setMaxHeight(50);*/
				Card _card = mCardList.get(position);
                _card.faceShown = true;
				Drawable dr = getResources().getDrawable(_card.imageId);

				/* make sure clicking the same card will not be clear the card */
				if (position == mPrevOpenCardPosition) {
					return;
				}
				mNumCardsOpen++;

				((ImageView) v).setImageDrawable(dr);
				if (mCardOpen) {
					int prevImageId = (  mCardList.get(mPrevOpenCard1)).imageId;
					if (prevImageId == _card.imageId) {
						playCorrectSound();
						mScore += 200;
						TextView tvCardTitle = (TextView)findViewById(R.id.cardtitle);
						tvCardTitle.setText("Score\n"+String.valueOf(mScore));
						View oldCard = gvCardGrid.getChildAt(mPrevOpenCard1);

						mClearedList.add(_card.imageId);
					//	mClearedList.add(mPrevOpenCard1);

						/* Make sure the cleared cards are not clicked again */
						oldCard.setClickable(false);
						v.setClickable(false);
						oldCard.setVisibility(View.INVISIBLE);
						v.setVisibility(View.INVISIBLE);
						// oldCard.setBackgroundDrawable(dr2);
						// v.setBackgroundDrawable(dr2);
						mCardOpen = false;
						mNumCardsRemaining -= 2;
						if (mNumCardsRemaining == 0) {
							mLevel++;
							mCardList.clear();
                            clearTimerText();
							showScore(GOTO_NEXT_LEVEL);


						}
						mNumCardsOpen = 0;

					} else {
						//mScore -= 5;
                     //   playWrongSound();

						mPrevOpenCard2 = position;
                       // showScore(GAME_OVER);

						Timer t = new Timer();

						t.schedule(new TimerTask() {

							@Override
							public void run() {
								mHandler.sendEmptyMessage(CLOSE_CARDS);

							}

						}, 200);
					}
				//	mCardOpen = false;
					mNumCardsOpen = 0;

				} else {
					mCardOpen = true;
					mPrevOpenCard1 = position;
				}
			//	Log.d("memory", "me mory in on item click");
				mPrevOpenCardPosition = position;
				/*tvScore.setText(String.valueOf(mScore));*/
                //TODO removed tvscore to save space

			}




		});
		mHandler = new Handler() {
			@Override
			public void handleMessage(Message msg) {
				// TODO Auto-generated method stub
				super.handleMessage(msg);
				if (msg.what == CLOSE_CARDS) {
					closeCards();
				}
			}

		};

        mSoundPool =  new SoundPool(10, AudioManager.STREAM_MUSIC, 0);
        mSoundPool.setOnLoadCompleteListener(new SoundPool.OnLoadCompleteListener() {
            @Override
            public void onLoadComplete(SoundPool soundPool, int sampleId,
                                       int status) {
                mSoundPoolLoaded = true;
            }
        });

        mSoundIDCorrect = mSoundPool.load(this, R.raw.correct, 1);
        mSoundIDWrong = mSoundPool.load(this,R.raw.beep,1);
        setVolumeControlStream(AudioManager.STREAM_MUSIC);

        if(savedInstanceState!=null){
            mLevel = savedInstanceState.getInt(STR_LEVEL);
            mScore = savedInstanceState.getInt(STR_SCORE);
            String[]temp = savedInstanceState.getStringArray(STR_CARD_LIST);
            if(mStringCardList==null){
                mStringCardList = new ArrayList<String>();
            }else{
                mStringCardList.clear();
            }
            mStringCardList.addAll( Arrays.asList(temp));
           /* for (String aTemp : temp) {
                mStringCardList.add(aTemp);
            }*/
         //   mStringCardList= (ArrayList<String>)Arrays.asList(temp);
            mClearedList = new ArrayList<Integer>();
            int []temp2 = savedInstanceState.getIntArray(STR_CLEARED_CARD_LIST);
            for (int aTemp2 : temp2) {
                mClearedList.add(aTemp2);
            }
            displayCardList();
            shuffleCardList();
            mNumCardsRemaining = savedInstanceState.getInt(STR_NUM_CARDS_REMINING);
            mOrientationChanged = true;
        }else {
            createCardList();
            shuffleCardList();
            mClearedList = new ArrayList<Integer>();
        }
        mGridAdapter = new CardGridAdapter(this, mCardList);
        gvCardGrid.setAdapter(mGridAdapter);

        tvHighScore = findViewById(R.id.highscore);
        tvHighScore.setTypeface(mTypefaceEvilDead);

        int highScore = getHighScore();
        tvHighScore.setText("High score\n:"+String.valueOf(highScore));

        startCountDownTimer();

    }

    private void playCorrectSound() {
        CommonMethods.playSound(this,mSoundPool,mSoundIDCorrect);
    }

    private void playWrongSound() {
        CommonMethods.playSound(this,mSoundPool,mSoundIDWrong);
	}



	/*private void loadAd() {
		adView = (AdView) findViewById(R.id.adView);


        if (adView != null) {
            AdRequest.Builder adRequestBuilder = new AdRequest.Builder().
                  addTestDevice(AdRequest.DEVICE_ID_EMULATOR)
                 .addTestDevice("2CE5F62607304EDDE0263F4B6544B01C");
            AdRequest adRequest = adRequestBuilder.build();

            // Start loading the ad in the background.
            adView.loadAd(adRequest);
        }


    }*/

	private void closeCards() {
	    mCardOpen = false;
		Drawable cardTop = getResources().getDrawable(R.drawable.cardtop3);
	/*	Log.d("memory", "prevcard1 and prevcard2 are" + mPrevOpenCard1
				+ mPrevOpenCard2);*/
		ImageView v = (ImageView) gvCardGrid.getChildAt(mPrevOpenCard1);
		v.setImageDrawable(cardTop);
		v = (ImageView) gvCardGrid.getChildAt(mPrevOpenCard2);
		v.setImageDrawable(cardTop);
		mCardOpen = false;
	}

	/**
	 * shuffle the mCardList
	 */
	private void shuffleCardList() {
	    if(mRandom==null){
            mRandom = new Random(Calendar.getInstance().getTimeInMillis());
        }
		int listSize = mCardList.size();
		for (int j = 0; j < NUM_OF_SHUFFLES; j++) {
			for (int i = 0; i < listSize / 2; i++) {
				Card temp = mCardList.get(i);
				int rnd = mRandom.nextInt(listSize - i);
				Card otherEndCard = mCardList.get(rnd);
				mCardList.set(i, otherEndCard);
				mCardList.set(rnd, temp);
			}
		}

	}

	private void showScore(final int gameEndMode) {
		if (mLevel < 8) {
			runOnUiThread(new Runnable() {

				@Override
				public void run() {
					int highScore = getHighScore();
					String message;
					String title = "";
					if (gameEndMode == GAME_OVER) {
						title = "Game Over\n\nSCORE "+mScore;
					}

					else if (gameEndMode == GOTO_NEXT_LEVEL) {
						title = "LEVEL " + String.valueOf(mLevel-1)+" COMPLETED\n\nSCORE "+mScore;
					}
					message = title;//+= "\n Level Cleared ";// + mScore;
					if (mScore > highScore) {
						saveHighestScore(mScore);
						message = "New High Score!!!";
				     /*	 if (title.equals("GameOver")) {
						 	message = "New High Score\n" + message;
						 } else {
						 	title = "New High Score !!";
						 }*/
					}
					showAlert(title, message, gameEndMode);
					pbTimerBar.setProgress(0);
                    pbTimerBar.setVisibility(View.GONE);
					mCountDownTimer.cancel();
				}

			});

		} else {
			showAlert("All levels Completed!!", " Your score is " + mScore, 0);
			this.finish();
		}

	}

	private int getHighScore() {
		SharedPreferences pref = PreferenceManager
				.getDefaultSharedPreferences(this);
        return pref.getInt("classic_score", 0);

	}

	private void showAlert(String title, String msgString, final int gameEndMode) {

		mCardList.clear();
	   /*  Drawable sad = getResources().getDrawable(R.drawable.sad);
        Drawable happy = getResources().getDrawable(R.drawable.happy);
        if(gameEndMode==GAME_OVER){
            tvEmpty.setCompoundDrawablesWithIntrinsicBounds(null, sad, null, null);
        }else{
            tvEmpty.setCompoundDrawablesWithIntrinsicBounds(null, happy, null, null);
        }*/

		tvEmpty.setTypeface(mTypefaceSlapStick);
		tvEmpty.setText(msgString);
        tvEmpty.setTextSize(22);
     //   tvEmpty.setTextColor(Color.parseColor("#FFFFC2CA"));//getResources().getColor(R.color.option_blue_color));

        tvEmpty.setShadowLayer(3, 1, 1, Color.DKGRAY);

        TextView cardTitle = (TextView)findViewById(R.id.cardtitle);
        cardTitle.setVisibility(View.INVISIBLE);
      //  cardTitle.setTypeface(mTypefaceSlapStick);

		gvCardGrid.setEmptyView(tvEmpty);
		mDialogCountTimer = new CountDownTimer((long) 1000, (long) 1000) {

			@Override
			public void onFinish() {
				// dialog.dismiss();
				if (gameEndMode == GOTO_NEXT_LEVEL) {
					showNextLevelgame();
				} else if (gameEndMode == GAME_OVER) {
					closeGame();
				}
			}

			@Override
			public void onTick(long arg0) {

			}
		}.start();

	}

	private void showNextLevelgame() {

		// mLevel++;
		mClearedList.clear();
		createCardList();
		shuffleCardList();
		if (mCountDownTimer != null) {
			mCountDownTimer.cancel();
		}
        int highScore = getHighScore();
        tvHighScore.setText("High score\n:"+String.valueOf(highScore));
		startCountDownTimer();
		// mGridAdapter.notifyDataSetChanged();
		// gvCardGrid.refreshDrawableState();
		// gvCardGrid.invalidateViews();
      //  int numCards = MIN_CARDS + ((mLevel - 1) * 2);
        /* if(numCards>12){
            gvCardGrid.setNumColumns(5);
        }*/
        setGridViewColumnCount();
		gvCardGrid.setAdapter(new CardGridAdapter(this, mCardList));
		mCardOpen = false;
        TextView cardTitle = (TextView)findViewById(R.id.cardtitle);
        cardTitle.setVisibility(View.VISIBLE);


        //NOT WORKING uh 28/10
       /* gvCardGrid.addOnLayoutChangeListener(new View.OnLayoutChangeListener() {
            @Override
            public void onLayoutChange(View view, int i, int i1, int i2, int i3, int i4, int i5, int i6, int i7) {
                if (!gridViewResized) {
                    gridViewResized = true;
                    resizeGridView();//, numItems, numColumns);
                }
            }


        });*/
	}


    /**
	 * select cards for the game and add them to the mCardList
	 */
	private void createCardList() {
	    if(mStringCardList==null){
            mStringCardList = new ArrayList<String>();
        }else{
            mStringCardList.clear();
        }
		mCardList = new ArrayList<Card>();
		// int numCols = mLevel + 2;
		int numCards = MIN_CARDS + ((mLevel - 1) * 2);
		/*Log.d("memorypro", "mlevel is  " + mLevel);*/
		mRandom =   new Random(Calendar.getInstance().getTimeInMillis());

		for (int i = 0; i < numCards / 2; i++) {
			Card _card = new Card();
			int suitRnd = mRandom.nextInt(4);
			switch (suitRnd) {
			case 0:
				_card.s1 = Card.SUIT.SPADE;
				break;
			case 1:
				_card.s1 = Card.SUIT.CLUB;
				break;
			case 2:
				_card.s1 = Card.SUIT.DIAMOND;
				break;
			case 3:
				_card.s1 = Card.SUIT.HEART;
				break;
			}
			_card.faceShown = false;
			int numRnd = mRandom.nextInt(9);
			_card.number = numRnd + 2;
			_card.imageId = R.drawable.club7;
			if (_card.s1 == Card.SUIT.CLUB && _card.number == 10) {
				_card.imageId = R.drawable.club10;
			} else if (_card.s1 == Card.SUIT.CLUB && _card.number == 9) {
				_card.imageId = R.drawable.club9;
			} else if (_card.s1 == Card.SUIT.CLUB && _card.number == 8) {
				_card.imageId = R.drawable.club8;
			} else if (_card.s1 == Card.SUIT.CLUB && _card.number == 7) {
				_card.imageId = R.drawable.club7;
			} else if (_card.s1 == Card.SUIT.CLUB && _card.number == 6) {
				_card.imageId = R.drawable.club6;
			} else if (_card.s1 == Card.SUIT.CLUB && _card.number == 5) {
				_card.imageId = R.drawable.club5;
			} else if (_card.s1 == Card.SUIT.CLUB && _card.number == 4) {
				_card.imageId = R.drawable.club4;
			} else if (_card.s1 == Card.SUIT.CLUB && _card.number == 3) {
				_card.imageId = R.drawable.club3;
			} else if (_card.s1 == Card.SUIT.CLUB && _card.number == 2) {
				_card.imageId = R.drawable.club2;
			}

			if (_card.s1 == Card.SUIT.DIAMOND && _card.number == 10) {
				_card.imageId = R.drawable.diamond10;
			} else if (_card.s1 == Card.SUIT.DIAMOND && _card.number == 9) {
				_card.imageId = R.drawable.diamond9;
			} else if (_card.s1 == Card.SUIT.DIAMOND && _card.number == 8) {
				_card.imageId = R.drawable.diamond8;
			} else if (_card.s1 == Card.SUIT.DIAMOND && _card.number == 7) {
				_card.imageId = R.drawable.diamond7;
			} else if (_card.s1 == Card.SUIT.DIAMOND && _card.number == 6) {
				_card.imageId = R.drawable.diamond6;
			} else if (_card.s1 == Card.SUIT.DIAMOND && _card.number == 5) {
				_card.imageId = R.drawable.diamond5;
			} else if (_card.s1 == Card.SUIT.DIAMOND && _card.number == 4) {
				_card.imageId = R.drawable.diamond4;
			} else if (_card.s1 == Card.SUIT.DIAMOND && _card.number == 3) {
				_card.imageId = R.drawable.diamond3;
			} else if (_card.s1 == Card.SUIT.DIAMOND && _card.number == 2) {
				_card.imageId = R.drawable.diamond2;
			}

			if (_card.s1 == Card.SUIT.HEART && _card.number == 10) {
				_card.imageId = R.drawable.heart10;
			} else if (_card.s1 == Card.SUIT.HEART && _card.number == 9) {
				_card.imageId = R.drawable.heart9;
			} else if (_card.s1 == Card.SUIT.HEART && _card.number == 8) {
				_card.imageId = R.drawable.heart8;
			} else if (_card.s1 == Card.SUIT.HEART && _card.number == 7) {
				_card.imageId = R.drawable.heart7;
			} else if (_card.s1 == Card.SUIT.HEART && _card.number == 6) {
				_card.imageId = R.drawable.heart6;
			} else if (_card.s1 == Card.SUIT.HEART && _card.number == 5) {
				_card.imageId = R.drawable.heart5;
			} else if (_card.s1 == Card.SUIT.HEART && _card.number == 4) {
				_card.imageId = R.drawable.heart4;
			} else if (_card.s1 == Card.SUIT.HEART && _card.number == 3) {
				_card.imageId = R.drawable.heart3;
			} else if (_card.s1 == Card.SUIT.HEART && _card.number == 2) {
				_card.imageId = R.drawable.heart2;
			}

			if (_card.s1 == Card.SUIT.SPADE && _card.number == 10) {
				_card.imageId = R.drawable.spade10;
			} else if (_card.s1 == Card.SUIT.SPADE && _card.number == 9) {
				_card.imageId = R.drawable.spade9;
			} else if (_card.s1 == Card.SUIT.SPADE && _card.number == 8) {
				_card.imageId = R.drawable.spade8;
			} else if (_card.s1 == Card.SUIT.SPADE && _card.number == 7) {
				_card.imageId = R.drawable.spade7;
			} else if (_card.s1 == Card.SUIT.SPADE && _card.number == 6) {
				_card.imageId = R.drawable.spade6;
			} else if (_card.s1 == Card.SUIT.SPADE && _card.number == 5) {
				_card.imageId = R.drawable.spade5;
			} else if (_card.s1 == Card.SUIT.SPADE && _card.number == 4) {
				_card.imageId = R.drawable.spade4;
			} else if (_card.s1 == Card.SUIT.SPADE && _card.number == 3) {
				_card.imageId = R.drawable.spade3;
			} else if (_card.s1 == Card.SUIT.SPADE && _card.number == 2) {
				_card.imageId = R.drawable.spade2;
			}
			Card card2 = new Card();
			card2.number = _card.number;
			card2.s1 = _card.s1;
			card2.imageId = _card.imageId;
			mCardList.add(_card);
			mCardList.add(card2);
			String str = "Suit"+String.valueOf(suitRnd)+"Num"+String.valueOf(numRnd);
			mStringCardList.add(str);
			mStringCardList.add(str);
		}
		mNumCardsRemaining = mCardList.size();// uncleared cards
	}

	/*
	 * @Override public void onItemClick(AdapterView<?> gridView, View v, int
	 * position, long id) { Card _card = mCardList.get(position); Drawable dr =
	 * getResources().getDrawable(_card.imageId); ((ImageButton)
	 * v).setImageDrawable(dr); Log.d("memory", "me mory in on item click");
	 * 
	 * }
	 */
	/*@Override
	public void onConfigurationChanged(Configuration newConfig) {
		// TODO Auto-generated method stub
		super.onConfigurationChanged(newConfig);


		// if (newConfig.orientation==Configuration.ORIENTATION_LANDSCAPE) {
		setGridViewColumnCount();
		// }
		//hideClearedCards();
	}*/

    /**
     * show existing card list after config change
     */
    private void displayCardList() {

        if(mCardList==null || mCardList.size()==0) {
            mCardList = new ArrayList<Card>();
            // int numCols = mLevel + 2;
            // int numCards = MIN_CARDS + ((mLevel - 1) * 2);

            for (int i = 0; i < mStringCardList.size(); i++) {
                Card _card = new Card();
                String str = mStringCardList.get(i);
                String temp[] = str.split("Num");
                if (temp.length < 2) {
                    return;//SOME ERROR
                }
                String suitStr = temp[0].replace("Suit", "");
                int suitNum = Integer.valueOf(suitStr);
                int cardNum = Integer.valueOf(temp[1]);


                // int suitRnd = mRandom.nextInt(4);
                switch (suitNum) {
                    case 0:
                        _card.s1 = Card.SUIT.SPADE;
                        break;
                    case 1:
                        _card.s1 = Card.SUIT.CLUB;
                        break;
                    case 2:
                        _card.s1 = Card.SUIT.DIAMOND;
                        break;
                    case 3:
                        _card.s1 = Card.SUIT.HEART;
                        break;
                }
                _card.faceShown = false;
                // int numRnd = mRandom.nextInt(9);
                _card.number = cardNum + 2;//numRnd + 2;
                _card.imageId = R.drawable.club7;
                if (_card.s1 == Card.SUIT.CLUB && _card.number == 10) {
                    _card.imageId = R.drawable.club10;
                } else if (_card.s1 == Card.SUIT.CLUB && _card.number == 9) {
                    _card.imageId = R.drawable.club9;
                } else if (_card.s1 == Card.SUIT.CLUB && _card.number == 8) {
                    _card.imageId = R.drawable.club8;
                } else if (_card.s1 == Card.SUIT.CLUB && _card.number == 7) {
                    _card.imageId = R.drawable.club7;
                } else if (_card.s1 == Card.SUIT.CLUB && _card.number == 6) {
                    _card.imageId = R.drawable.club6;
                } else if (_card.s1 == Card.SUIT.CLUB && _card.number == 5) {
                    _card.imageId = R.drawable.club5;
                } else if (_card.s1 == Card.SUIT.CLUB && _card.number == 4) {
                    _card.imageId = R.drawable.club4;
                } else if (_card.s1 == Card.SUIT.CLUB && _card.number == 3) {
                    _card.imageId = R.drawable.club3;
                } else if (_card.s1 == Card.SUIT.CLUB && _card.number == 2) {
                    _card.imageId = R.drawable.club2;
                }

                if (_card.s1 == Card.SUIT.DIAMOND && _card.number == 10) {
                    _card.imageId = R.drawable.diamond10;
                } else if (_card.s1 == Card.SUIT.DIAMOND && _card.number == 9) {
                    _card.imageId = R.drawable.diamond9;
                } else if (_card.s1 == Card.SUIT.DIAMOND && _card.number == 8) {
                    _card.imageId = R.drawable.diamond8;
                } else if (_card.s1 == Card.SUIT.DIAMOND && _card.number == 7) {
                    _card.imageId = R.drawable.diamond7;
                } else if (_card.s1 == Card.SUIT.DIAMOND && _card.number == 6) {
                    _card.imageId = R.drawable.diamond6;
                } else if (_card.s1 == Card.SUIT.DIAMOND && _card.number == 5) {
                    _card.imageId = R.drawable.diamond5;
                } else if (_card.s1 == Card.SUIT.DIAMOND && _card.number == 4) {
                    _card.imageId = R.drawable.diamond4;
                } else if (_card.s1 == Card.SUIT.DIAMOND && _card.number == 3) {
                    _card.imageId = R.drawable.diamond3;
                } else if (_card.s1 == Card.SUIT.DIAMOND && _card.number == 2) {
                    _card.imageId = R.drawable.diamond2;
                }

                if (_card.s1 == Card.SUIT.HEART && _card.number == 10) {
                    _card.imageId = R.drawable.heart10;
                } else if (_card.s1 == Card.SUIT.HEART && _card.number == 9) {
                    _card.imageId = R.drawable.heart9;
                } else if (_card.s1 == Card.SUIT.HEART && _card.number == 8) {
                    _card.imageId = R.drawable.heart8;
                } else if (_card.s1 == Card.SUIT.HEART && _card.number == 7) {
                    _card.imageId = R.drawable.heart7;
                } else if (_card.s1 == Card.SUIT.HEART && _card.number == 6) {
                    _card.imageId = R.drawable.heart6;
                } else if (_card.s1 == Card.SUIT.HEART && _card.number == 5) {
                    _card.imageId = R.drawable.heart5;
                } else if (_card.s1 == Card.SUIT.HEART && _card.number == 4) {
                    _card.imageId = R.drawable.heart4;
                } else if (_card.s1 == Card.SUIT.HEART && _card.number == 3) {
                    _card.imageId = R.drawable.heart3;
                } else if (_card.s1 == Card.SUIT.HEART && _card.number == 2) {
                    _card.imageId = R.drawable.heart2;
                }

                if (_card.s1 == Card.SUIT.SPADE && _card.number == 10) {
                    _card.imageId = R.drawable.spade10;
                } else if (_card.s1 == Card.SUIT.SPADE && _card.number == 9) {
                    _card.imageId = R.drawable.spade9;
                } else if (_card.s1 == Card.SUIT.SPADE && _card.number == 8) {
                    _card.imageId = R.drawable.spade8;
                } else if (_card.s1 == Card.SUIT.SPADE && _card.number == 7) {
                    _card.imageId = R.drawable.spade7;
                } else if (_card.s1 == Card.SUIT.SPADE && _card.number == 6) {
                    _card.imageId = R.drawable.spade6;
                } else if (_card.s1 == Card.SUIT.SPADE && _card.number == 5) {
                    _card.imageId = R.drawable.spade5;
                } else if (_card.s1 == Card.SUIT.SPADE && _card.number == 4) {
                    _card.imageId = R.drawable.spade4;
                } else if (_card.s1 == Card.SUIT.SPADE && _card.number == 3) {
                    _card.imageId = R.drawable.spade3;
                } else if (_card.s1 == Card.SUIT.SPADE && _card.number == 2) {
                    _card.imageId = R.drawable.spade2;
                }

                mCardList.add(_card);

                //  String str2 = "Suit"+String.valueOf(suitRnd)+"Num"+String.valueOf(numRnd);
                //   mStringCardList.add(str);
                //  mStringCardList.add(str);
            }
        }
        mNumCardsRemaining = mCardList.size();// uncleared cards
        setGridViewColumnCount();
        gvCardGrid.addOnLayoutChangeListener(new View.OnLayoutChangeListener() {
            @Override
            public void onLayoutChange(View view, int i, int i1, int i2, int i3, int i4, int i5, int i6, int i7) {
                if(!mOrientationChanged)
                   return;
                mOrientationChanged = true;
                for(int j=0;mClearedList!=null && j<mClearedList.size();j++){
                    int imageId = mClearedList.get(j);
                    //Now scan through grid and hide cleared cards
                    for(int k=0;k<gvCardGrid.getCount();k++){
                        Card c = (Card)gvCardGrid.getAdapter().getItem(k);
                        int imageResourceId = c.imageId;
                        if(imageId==imageResourceId){
                            View v = gvCardGrid.getChildAt(k);
                            v.setVisibility(View.INVISIBLE);
                        }
                    }
                }
            }
        });

        gvCardGrid.refreshDrawableState();
    }


    private void clearTimerText(){
        tvTime.setText("");
    }

	private void setGridViewColumnCount() {
		DisplayMetrics metrics  = new DisplayMetrics();
		this.getWindowManager().getDefaultDisplay().getMetrics(metrics);
		mWidth = metrics.widthPixels;
		mHeight = metrics.heightPixels;



        int numColumns= 5;
		 /* if(wid<ht) {//portrait orientation
			mCardWidth = (int) (wid - 2 * getResources().getDimension(R.dimen.activity_horizontal_margin)) / 5;
			mCardHeight = (int) (1.5 * mCardWidth);
            gvCardGrid.setNumColumns(5);
		}else{*/
		int orientation = getWindow().getWindowManager().getDefaultDisplay().getOrientation();
		//if landscape orientaion
		if(mWidth>mHeight  || orientation== Configuration.ORIENTATION_LANDSCAPE) {
            numColumns = 7;
        }
        if(mWidth<400){
            numColumns=4;
        }
            gvCardGrid.setNumColumns(numColumns);
			mCardWidth = (int) (mWidth - 2 * getResources().getDimension(R.dimen.activity_horizontal_margin)) / numColumns;
			mCardHeight = (int) (1.5 * mCardWidth);

       // int numCards = MIN_CARDS + ((mLevel - 1) * 2);
     /*   int numRows = numCards/numColumns;
        TextView cardTitle = (TextView)findViewById(R.id.cardtitle);
        int titleHt = cardTitle.getHeight();
        TextView time = (TextView)findViewById(R.id.timeseconds);
        int timeHt = time.getHeight();
        if ((mCardHeight*numRows+timeHt+titleHt )>ht){
            numColumns++;
        }
        gvCardGrid.setNumColumns(numColumns);
        mCardWidth = (int) (wid - 2 * getResources().getDimension(R.dimen.activity_horizontal_margin)) / numColumns;
        mCardHeight = (int) (1.5 * mCardWidth);*/

//This concept for shrinking the cards if cards are cut off isn't working.
        /*float lastY = gvCardGrid.getY()+numRows*mCardHeight;
        LinearLayout parentLayout = (LinearLayout)findViewById(R.id.parentlayout);
        int layoutHt = parentLayout.getHeight();

        if(lastY>layoutHt){
            numColumns+=1;
            gvCardGrid.setNumColumns(numColumns);
            mCardWidth = (int) (wid - 2 * getResources().getDimension(R.dimen.activity_horizontal_margin)) / numColumns;
            mCardHeight = (int) (1.5 * mCardWidth);
        }*/
        gvCardGrid.refreshDrawableState();

		/*if (cardWidth != 0) {
			int numCols = wid / cardWidth;
			if (numCols > 0) {
				gvCardGrid.setNumColumns(numCols);
			}
		}*/
	//	hideClearedCards();
	}

	private void startCountDownTimer() {
        pbTimerBar = (ProgressBar)findViewById(R.id.time);
        pbTimerBar.setVisibility(View.VISIBLE);
		mCountDownTimer = new CountDownTimer(GAME_TIME, TIME_UPDATE_INTERVAL) {

			@Override
			public void onFinish() {
                tvTime.setText("");
                pbTimerBar.setVisibility(View.GONE);


				showScore(GAME_OVER);
			}

			@Override
			public void onTick(long millisUntilFinished) {
				// /int timeCovered = (int) (GAME_TIME - millisUntilFinished);

				pbTimerBar.setProgress((int) millisUntilFinished);
				float timeSec = (float) (millisUntilFinished / 1000.0);
				String timeLeftString = String.format(Locale.getDefault(),"%5.0f", timeSec)+'s';
				tvTime.setText(timeLeftString);
                tvTime.setTextColor(Color.DKGRAY);
                if(millisUntilFinished<=10000){
                    tvTime.setTextColor(Color.RED);
                }
			}

		}.start();

	}

	private void saveHighestScore(int highScore) {
		SharedPreferences pref = PreferenceManager
				.getDefaultSharedPreferences(this);
		SharedPreferences.Editor editr = pref.edit();
		editr.putInt("classic_score", highScore);
		editr.commit();

	}

	private void closeGame() {
		this.finish();

	}

	/*@Override
	public boolean onCreateOptionsMenu(Menu menu) {
		// Inflate the menu items for use in the action bar
		MenuInflater inflater = getMenuInflater();
		inflater.inflate(R.menu.activity_main, menu);
		return super.onCreateOptionsMenu(menu);
	}*/

	/*@Override
	public boolean onOptionsItemSelected(MenuItem item) {
		// Handle presses on the action bar items
		switch (item.getItemId()) {

		*//*case R.id.action_settings:
			openSettings();
			return true;*//*
		case R.id.action_help:
			showClassicHelp();
			return true;
		default:
			return super.onOptionsItemSelected(item);
		}
	}*/

	private void showClassicHelp() {

		Dialog d = new Dialog(this);
		d.requestWindowFeature(Window.FEATURE_NO_TITLE);
		int w, h;
		w = this.getWindowManager().getDefaultDisplay().getWidth();
		h = this.getWindowManager().getDefaultDisplay().getHeight();

		d.setContentView(R.layout.helplayout);
		d.getWindow().setFeatureInt(Window.FEATURE_NO_TITLE, 1);
		d.setTitle("How to playunpressed");
		WebView webview = (WebView) d.findViewById(R.id.webView1);
		webview.setLayoutParams(new LayoutParams((int) (w * 0.9),
				(int) (h * 0.9)));

		String str = Constants.PLAY_CLASSIC_INSTRUCTIONS;

		webview.loadData(str, "text/html", null);
		// webview.setBackgroundColor(Color.parseColor("#77ffffff"));
		// AlertDialog.Builder builder = new AlertDialog.Builder(this);
		// builder.setInverseBackgroundForced(false);

		/*
		 * TextView tv = new TextView(this); tv.setLayoutParams(new
		 * LinearLayout.
		 * LayoutParams(LayoutParams.WRAP_CONTENT,LayoutParams.WRAP_CONTENT));
		 * // tv.setScrollContainer(true);
		 * tv.setText(Constants.PLAY_INSTRUCTIONS);
		 * tv.setBackgroundColor(Color.WHITE); tv.setTextColor(Color.DKGRAY);
		 * tv.setTextSize(android.R.style.TextAppearance_Medium);
		 * builder.setView(tv);
		 */
		// builder.setTitle("How to playunpressed");
		// builder.setMessage(Constants.PLAY_INSTRUCTIONS);
		// builder.show();
		d.show();

	}

    @Override
    protected void onSaveInstanceState(Bundle outState) {
        super.onSaveInstanceState(outState);
        outState.putInt(STR_LEVEL, mLevel);
        outState.putInt(STR_SCORE, mScore);
        String[] temp3 = new String[mStringCardList.size()];
        for(int i=0;i<mStringCardList.size();i++){
            temp3[i] = mStringCardList.get(i);
        }
        outState.putStringArray(STR_CARD_LIST,temp3);// (String[]) mStringCardList.toArray());
        int [] temp = new int[mClearedList.size()];
        for(int i=0;i<mClearedList.size();i++){
             temp[i] = mClearedList.get(i);
        }

        outState.putIntArray(STR_CLEARED_CARD_LIST, temp);

        outState.putInt(STR_NUM_CARDS_REMINING,mNumCardsRemaining);

    }

    /*private void openSettings() {
            // TODO Auto-generated method stub

        }*/
    private void resizeGridView( ){//}, int items, int columns) {
       /* ViewGroup.LayoutParams params = gvCardGrid.getLayoutParams();
        int oneRowHeight = gridView.getHeight();
        int rows = (int) (items / columns);
        params.height = oneRowHeight * rows;
        gridView.setLayoutParams(params);*/
        int numCards = MIN_CARDS + ((mLevel - 1) * 2);
        int numColumns = gvCardGrid.getNumColumns();
        int numRows = numCards/numColumns;
        TextView cardTitle = (TextView)findViewById(R.id.cardtitle);
        int titleHt = cardTitle.getHeight();
        TextView time = (TextView)findViewById(R.id.timeseconds);
        int timeHt = time.getHeight();
        if ((mCardHeight*numRows+timeHt+titleHt )>mHeight){
            numColumns++;
        }
        gvCardGrid.setNumColumns(numColumns);
        mCardWidth = (int) (mWidth - 2 * getResources().getDimension(R.dimen.activity_horizontal_margin)) / numColumns;
        mCardHeight = (int) (1.5 * mCardWidth);
        gvCardGrid.refreshDrawableState();
    }




class CardGridAdapter extends BaseAdapter {

	private final Context mContext;
	private final List<Card> mList;
	private final LayoutInflater mInflater;
	private final Drawable mCardTopDrawable;


	public CardGridAdapter(Context ctx, List cardList) {
		mContext = ctx;
		mList = cardList;
		mInflater = (LayoutInflater) ctx
				.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
		mCardTopDrawable = ctx.getResources().getDrawable(R.drawable.cardtop3);


	}

	@Override
	public int getCount() {
		return mList.size();
	}

	@Override
	public Object getItem(int position) {
		return mList.get(position);
	}

	@Override
	public long getItemId(int position) {

		return position;
	}

	@Override
	public View getView(int position, View convertView, ViewGroup parent) {

		if (convertView == null) {
            convertView= mInflater.inflate(R.layout.grid_element, null);
        }


			ImageView iv = (ImageView) convertView.findViewById(R.id.card_image);
			/*int w = ClassicMemoryActivity.mCardWidth;
			int h = ClassicMemoryActivity.mCardHeight;
			iv.setLayoutParams(new AbsListView.LayoutParams(w,h));*/

			iv.setImageDrawable(mCardTopDrawable);

		//	iv.setLayoutParams(new AbsListView.LayoutParams(120,120));
			//iv.setMaxWidth(50);
			//iv.setMaxHeight(50);

        return convertView;
		}


	}



}

/**
 TODO Remove settings in all screens.
 TODO Change icons in mdpi, ldpi etc
 TODO Create large,small and medium avd and check on all
 TODO Check properly words are not repeated

 */
class Card {
    int imageId;
    int number;

    enum SUIT {
        SPADE, CLUB, HEART, DIAMOND
    }

    SUIT s1;

    boolean faceShown;

}
