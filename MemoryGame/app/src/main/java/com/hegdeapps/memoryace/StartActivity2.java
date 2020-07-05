package com.hegdeapps.memoryace;

import android.app.AlertDialog;
import android.content.Intent;
import android.graphics.Color;
import android.graphics.Typeface;
import android.net.Uri;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.Menu;
import android.view.MenuInflater;
import android.view.MenuItem;
import android.view.View;
import android.widget.Button;
import android.widget.RelativeLayout;
import android.widget.TextView;


/*import com.google.android.gms.ads.AdRequest;
import com.google.android.gms.ads.AdView;*/


public class StartActivity2 extends AppCompatActivity implements
		/*OnItemClickListener,*/ View.OnClickListener {

    private static final int OPTION_CARDS = 1;
    private static final int OPTION_PATTERNS =2 ;
    private static final int OPTION_SIMON =3 ;
    private static final int OPTION_FACES =4 ;

    @Override
	public void onBackPressed() {

		super.onBackPressed();
		this.finish();
	}

	private static final int NUMBERACTIVITY = 0;
	private static final int WORDACTIVITY = 1;
	private static final String FIRST_USE = "firstuse";
	private static final int PICTUREATIVITY = 2;
	private static final int CLASSICACTIVITY = 3;
	private Button btnWord, btnNumber, btnHelp;// , btnPictures;
	private TextView tvTitle;
	private RelativeLayout parentLayout;

	private int mLevel = 0;
	private Button btnClassic;
	//GridView lvOptions;

//	private static final int SHAPES = 0;

	private static final int CLASSIC =1;

	private static final int PATTERNACTIVITY = 2;



    @Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.startactvt);

     /*   MobileAds.initialize(this, getResources().getString(R.string.ad_mob_app_id));
        adView = (AdView) findViewById(R.id.adView);

        AdRequest adRequest = new AdRequest.Builder()
                .addTestDevice(AdRequest.DEVICE_ID_EMULATOR)
                .addTestDevice("117F9CB327747DBE6FF60C0DF9BD8B79").build();*/

        // Start loading the ad in the background.

        Toolbar toolbar = findViewById(R.id.toolbar);
        if(toolbar!=null){
            ;
            setSupportActionBar(toolbar);
        }

       Typeface tfsolid3d = Typeface.createFromAsset(getAssets(),"peacesans.otf");

	//	parentLayout = (RelativeLayout) findViewById(R.id.mainlayout);
		Button btnCards,btnPattern,btnFaces;

		Button btnSimon;

		btnCards = findViewById(R.id.btnCards);
		btnCards.setOnClickListener(this);
		btnCards.setTypeface(tfsolid3d);


        btnPattern = findViewById(R.id.btnPattern);
        btnPattern.setOnClickListener(this);
        btnPattern.setTypeface(tfsolid3d);

        btnFaces = findViewById(R.id.btnFaces);
        btnFaces.setOnClickListener(this);
        btnFaces.setTypeface(tfsolid3d);

        btnSimon = findViewById(R.id.btnSimon);
        btnSimon.setOnClickListener(this);
        btnSimon.setTypeface(tfsolid3d);


		/*lvOptions = (GridView) findViewById(R.id.listView1);
		// TODO find out orientation and can we set numColumns
		*//*int rot = getWindow().getWindowManager().getDefaultDisplay()
				.getRotation();
		if (rot == Surface.ROTATION_0 || rot == Surface.ROTATION_180) {
			lvOptions.setNumColumns(1);
		}*//*
		lvOptions.setAdapter(new MyListAdapter(this));
		lvOptions.setOnItemClickListener(this);*/


        TextView tvTitle = findViewById(R.id.title);
        Typeface tfAgRed = Typeface.createFromAsset(getAssets(),"agentred.ttf");
        tvTitle.setTypeface(tfAgRed);
        tvTitle.setTextSize(26);
        tvTitle.setTextColor(Color.WHITE);
       /* adView.loadAd(adRequest);
        adView.setAdListener(new AdListener(){
            @Override
            public void onAdFailedToLoad(int i) {
                super.onAdFailedToLoad(i);
                Log.d("memory","add failed and error code is"+i);
            }
        });*/
	}

	@Override
	public void onStart() {
		super.onStart();

	}



  /*  private void displayHelp() {
		*//*
		 * TODO incomplete. improve wordings of the help text
		 *//*

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

		String str = Constants.PLAY_INSTRUCTIONS;

		webview.loadData(str, "text/html", null);

		d.show();

	}*/

	private void startIntent(int act) {
		Intent intent = new Intent();
     /*   if(act==0){
            intent.setClass(this,ShapeActivity.class);
        }
		 else*/ if (act == OPTION_CARDS) {
			intent.setClass(this, CardsActivity.class);
		}
		else if (act==OPTION_PATTERNS){
			intent.setClass(this,PatternsActvt.class);
		}
        else if (act==OPTION_SIMON){
            intent.setClass(this,SimonActivity.class);
        }
		else if(act==OPTION_FACES){
			intent.setClass(this,FaceActivityMod.class);
		}
       /* else if (act==4){
            intent.setClass(this,WordActivity2.class);
        }*/
		startActivity(intent);
	}

	/*
	 * private Drawable createBackground() { // int colors[]=new //
	 * int[]{Color.parseColor("#edfff9"),Color.parseColor("#c3ffeb")}; int
	 * colors[] = new int[] { Color.parseColor("#32edf9"),
	 * Color.parseColor("#ffffff"), Color.parseColor("#4425f1") };
	 * GradientDrawable gr = new GradientDrawable(
	 * GradientDrawable.Orientation.BL_TR, colors); gr.setCornerRadius(5);
	 * gr.setStroke(1, Color.parseColor("#E0E6F8"));
	 * gr.setGradientType(GradientDrawable.LINEAR_GRADIENT); WindowManager
	 * windowManager = (WindowManager) this
	 * .getSystemService(Context.WINDOW_SERVICE);
	 * 
	 * int height = windowManager.getDefaultDisplay().getHeight();
	 * 
	 * // Log.d("memory","Radius is "+parentLayout.getHeight());
	 * gr.setGradientRadius(height); // gr.setShape(GradientDrawable.LINE);
	 * gr.setGradientCenter(0, 0); gr.setAlpha(240);
	 * 
	 * return gr; }
	 */

/*	@Override
	protected void onDestroy() {
		//adView.destroy();
		super.onDestroy();
	}*/

    @Override
    public void onClick(View v) {
	    int id = v.getId();
	    switch (id){
            case R.id.btnCards : startIntent(OPTION_CARDS);
            break;
            case R.id.btnFaces : startIntent(OPTION_FACES);
            break;
            case R.id.btnPattern: startIntent(OPTION_PATTERNS);
            break;
            case R.id.btnSimon:startIntent(OPTION_SIMON);
            break;
        }

    }

  /*  private int getHighScore(int position) {
        SharedPreferences pref = PreferenceManager
                .getDefaultSharedPreferences(this);
        int highScore = 0;
        // Drawable dr = null;
        switch (position) {


            case OPTION_CARDS:
                highScore = pref.getInt("classic_score", -10);
                // dr = mContext.getResources().getDrawable(R.drawable.bluesky);
                break;
            case OPTION_PATTERNS:
                highScore = pref.getInt("pattern_score", -10);
                break;
            case OPTION_SIMON:
                highScore = pref.getInt(Constants.SIMON_GAME_MAX_SCORE,-10);
                break;
            case OPTION_FACES:
                highScore = pref.getInt(Constants.FACE_GAME_MAX_SCORE,-10);
                break;

        }

        return highScore;


}
	}
*/
    /*public class MyListAdapter extends BaseAdapter {
		final Context mContext;
		final LayoutInflater mInflater;
		final String[] mOptionsArray = { *//*"Shapes", *//* "Cards","Patterns","Simon" ,"Faces" };

		private static final int CLASSIC = 0;
		private static final int PATTERNS = 1;
		TextView *//*tvHighScoreLabel,*//* tvHighScore;
		TextView tvOption;
	//	private String[] bgColor = { "#773344", "#337744", "#443377","#F2B140","#A62972" };

		public MyListAdapter(Context ctx) {
			mContext = ctx;
			mInflater = LayoutInflater.from(ctx);
		}

		@Override
		public int getCount() {

			return mOptionsArray.length;
		}

		@Override
		public Object getItem(int arg0) {

			return mOptionsArray[arg0];
		}

		@Override
		public long getItemId(int position) {

			return position;
		}

		@Override
		public View getView(int position, View convertView, ViewGroup parent) {
			// Log.d("memorypro", "get view of start activity is called");
			if (convertView == null) {
				convertView = mInflater.inflate(R.layout.firstrow, null);

			}
			//int color = 0;
		*//*	if (position == 0) {
				 color = getResources().getColor(R.color.firebrick);

			} else if (position == 1) {
				color = getResources().getColor(R.color.option_green_color);
			} else if (position == 2) {
				color = getResources().getColor(R.color.option_red_color);
			}
            else if (position==3){
                color = getResources().getColor(R.color.darker_blue);
            }
            else if(position==4){
                color=getResources().getColor(R.color.darkpink);
            }
			int color2 =Color.TRANSPARENT;// getResources().getColor(R.color.option_green_color);
			int colors[] = new int[]{color ,color,color,Color.WHITE};
			GradientDrawable dr = new GradientDrawable(Orientation.BR_TL,colors);
            dr.setStroke(1,color);

			convertView.setBackgroundDrawable(dr);*//*
			// int col = mContext.getResources().getColor(R.color.brown);

			// convertView.setBackgroundColor(col);
			tvOption = (TextView) convertView.findViewById(R.id.tvoption);

			tvHighScore = (TextView) convertView.findViewById(R.id.highscore);
			tvHighScore.setTextColor(Color.WHITE);

			tvOption.setText(mOptionsArray[position]);
			Typeface slapstick = Typeface.createFromAsset(getAssets(),
					"evildead.ttf");
			tvOption.setTypeface(slapstick);
			tvOption.setTextColor(Color.WHITE);
			// tvOption.setBackground(mContext.getResources().getDrawable(
			// R.drawable.bg));
			// tvScore.setTypeface(slapstick);
			// tvScore.setTextColor(Color.WHITE);
			// tvScore.setText("0");
			// tvScoreLabel.setTypeface(slapstick);
			// tvScoreLabel.setTextColor(Color.WHITE);
			showHighscore(position);
			return convertView;

		}

		private void showHighscore(int position) {
			SharedPreferences pref = PreferenceManager
					.getDefaultSharedPreferences(mContext);
			int highScore = 0;
			// Drawable dr = null;
			switch (position) {
               *//* case 0: highScore = pref.getInt(Constants.SHAPE_GAME_MAX_SCORE,-10);
                    break;*//*

			case CLASSIC:
				highScore = pref.getInt("classic_score", -10);
				// dr = mContext.getResources().getDrawable(R.drawable.bluesky);
				break;
			case PATTERNS:
				highScore = pref.getInt("pattern_score", -10);
				break;
            case 2:
                 highScore = pref.getInt(Constants.SIMON_GAME_MAX_SCORE,-10);
                    break;
            case 3:
                highScore = pref.getInt(Constants.FACE_GAME_MAX_SCORE,-10);
                break;

			}

			if (highScore >= 0) {
				tvHighScore.setText(String.valueOf(highScore));
			} *//*else {
				tvHighScoreLabel.setText("Not played");
			}*//*
			// tvOption.setBackgroundDrawable(dr);

		}
	}
*/
	/*@Override
	public void onItemClick(AdapterView<?> arg0, View v, int position, long arg3) {
		switch (position) {
		case 0:
			startIntent(0);
			break;

		case 1:
			startIntent(1);
			break;
		case 2:
			startIntent(2);
            break;
            case 3:
                startIntent(3);
                break;

		}

	}*/

/*	@Override
	public void onWindowFocusChanged(boolean hasFocus) {
		super.onWindowFocusChanged(hasFocus);
		*//*if (hasFocus) {
			lvOptions.setAdapter(new MyListAdapter(this));
			// TODO this is not the right method of calling getView of the
			// adapter after changed
		}*//*
	}*/

 	@Override
	public boolean onCreateOptionsMenu(Menu menu) {
		// Inflate the menu items for use in the action bar
		MenuInflater inflater = getMenuInflater();
		inflater.inflate(R.menu.activity_main, menu);
		return super.onCreateOptionsMenu(menu);
	}

 @Override
	public boolean onOptionsItemSelected(MenuItem item) {
		// Handle presses on the action bar items
		switch (item.getItemId()) {
            case R.id.action_about:
                displayAboutScreen();
                break;
            case R.id.action_feedback:
                startFeedbackIntent();
                break;
            case R.id.action_rate:
                showGplayConsole();
                break;
            case R.id.action_otherapps:
                showOtherAppsScreen();
                break;
          }
			return super.onOptionsItemSelected(item);
		}

    private void showGplayConsole() {
 	    String url = getResources().getString(R.string.playurl);
        Intent intent = new  Intent(Intent.ACTION_VIEW, Uri.parse(url));
        startActivity(intent);
    }
    private void showOtherAppsScreen() {
        String url = getResources().getString(R.string.otherappurl);
        Intent intent = new  Intent(Intent.ACTION_VIEW, Uri.parse(url));
        startActivity(intent);
    }


    private void startFeedbackIntent() {
        Intent intent = new  Intent(Intent.ACTION_SEND);
        intent.setData(Uri.parse("mailto:"));
        intent.setType("text/plain");
        String mailId = getResources().getString(R.string.mail_id);
        intent.putExtra(Intent.EXTRA_EMAIL,new String[]{mailId});
        intent.putExtra(Intent.EXTRA_SUBJECT,"Feedback on "+getResources().getString(R.string.app_name));
        startActivity(intent);
    }

    private void displayAboutScreen() {
        AlertDialog.Builder builder = new AlertDialog.Builder(this);
        builder.setMessage(getResources().getString(R.string.about_app));
        builder.show();
    }
}

/**
 * The words are getting repeated some times in word puzzle the dialog help is
 * not appearing
 * 
 */
