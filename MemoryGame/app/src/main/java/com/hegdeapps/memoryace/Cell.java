package com.hegdeapps.memoryace;

import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Paint;
import android.graphics.Paint.Style;
import android.graphics.Rect;
import android.graphics.drawable.ColorDrawable;
import android.graphics.drawable.GradientDrawable;
import android.graphics.drawable.GradientDrawable.Orientation;

class Cell {
	public float getTlX() {
		return tlX;
	}
	public void setTlX(float tlX) {
		this.tlX = tlX;
	}
	public float getTlY() {
		return tlY;
	}
	public void setTlY(float tlY) {
		this.tlY = tlY;
	}
	public float getHeight() {
		return height;
	}
	public void setHeight(float height) {
		this.height = height;
	}
	public float getWidth() {
		return width;
	}
	public void setWidth(float width) {
		this.width = width;
	}
	public boolean isFilled() {
		return filled;
	}
	public void setFilled(boolean isFilled) {
		this.filled = isFilled;
	}
	private float  tlX;
    private float tlY;
	private float height;
    private float width;
	private boolean filled;
	private boolean opened;
	public boolean isOpened() {
		return opened;
	}
	public void setOpened(boolean opened) {
		this.opened = opened;
	}
	 void drawCell(Canvas c,Paint p, boolean  drawFilled){
		p.setColor(Color.WHITE);
		p.setDither(true);
		p.setStyle(Style.STROKE);
		p.setStrokeWidth(1);
		 
		//Log.d("com.hegdeapps.memorygmae","this cell is "+opened);
		c.drawRect(new Rect((int)tlX, (int)tlY, (int)(tlX+width-2),(int) (tlY+height-2)), p);
		if(drawFilled  && filled){
			//p.setShader(new LinearGradient(0,0,tlX,tlY,Color.BLUE,Color.CYAN,Shader.TileMode.REPEAT));//new SweepGradient(0,(int)(tlY+height/2.0),Color.RED,Color.BLUE));//(int)(tlX+width/2.0),(int)(tlY+height/2.0),Color.WHITE,Color.BLUE));
			
			p.setStyle(Style.FILL_AND_STROKE);
			
		/*	int []colors = new int[]{Color.parseColor("#FF395B61"),Color.parseColor("#FF473148")
            };//,Color.parseColor("#ff9999"),Color.parseColor("#ff0000")};*/
            ColorDrawable dr = new ColorDrawable();
            dr.setColor(Color.parseColor("#FF395B61"));
            dr.setBounds((new Rect((int)tlX, (int)tlY, (int)(tlX+width-2),(int) (tlY+height-2) )));

            dr.setDither(true);

			/*GradientDrawable dr = new GradientDrawable(Orientation.BOTTOM_TOP,colors);
			dr.setCornerRadii(new float []{3,3,3,3,3,3,3,3});
			dr.setStroke(1, Color.parseColor("#cd002f"));
			dr.setDither(true);
			dr.setBounds((new Rect((int)tlX, (int)tlY, (int)(tlX+width-2),(int) (tlY+height-2) )));*/
			dr.draw(c);

			
			//c.drawRect(new Rect((int)tlX, (int)tlY, (int)(tlX+width-2),(int) (tlY+height-2)), p);
		}
		else{
			int []colors = new int[]{Color.parseColor("#e7e7e7"),Color.parseColor("#e9e9e9")};
			
			GradientDrawable dr = new GradientDrawable(Orientation.BOTTOM_TOP,colors);
			dr.setBounds((new Rect((int)tlX, (int)tlY, (int)(tlX+width-2),(int) (tlY+height-2) )));
			dr.setCornerRadii(new float []{3,3,3,3,3,3,3,3});
			dr.setStroke(1, Color.parseColor("#c0c0c0"));
			dr.setDither(true);
			dr.draw(c);
			
			//p.setShader(new LinearGradient(0,0,tlX,tlY,Color.DKGRAY,Color.WHITE,Shader.TileMode.REPEAT)); 
//p.setShader(new LinearGradient(8f, 8f, 90f,8f, Color.GRAY,Color.WHITE, Shader.TileMode.REPEAT));
			
		//	p.setStyle(Style.FILL_AND_STROKE);
			//c.drawRect(new Rect((int)tlX, (int)tlY, (int)(tlX+width-2),(int) (tlY+height-2)), p);
	
		}
		
	}

}
