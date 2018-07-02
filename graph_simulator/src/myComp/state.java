package myComp;

import java.awt.Graphics;
import java.awt.image.BufferedImage;

public interface state {

	public void render(Graphics g);

	public void startState();

	public void stopState();

	public void seText(String text);

	public String getString();

	public void setImage(BufferedImage bm);

}
