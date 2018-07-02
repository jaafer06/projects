package myComp;

import java.awt.Color;
import java.awt.Font;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.RenderingHints;
import java.awt.image.BufferedImage;

public class steady implements state {
	int width, height;
	Color c;
	String s;
	BufferedImage bm;

	public steady(int width, int height, Color c, String s) {
		this.width = width;
		this.height = height;
		this.c = c;
		this.s = s;

	}

	public steady(int width, int height, BufferedImage bm, String s) {
		this.s = s;
		this.width = width;
		this.height = height;
		this.bm = bm;

	}

	@Override
	public void render(Graphics gg) {
		Graphics2D g = (Graphics2D) gg;
		g.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);
		g.setFont(new Font("Arial", Font.PLAIN, 12));

		if (bm == null) {

			g.setColor(c);
			g.fillRect(0, 0, width, height);
			g.setColor(Color.white);

			g.drawString(s, 3, 3 + height / 2);
		}

		else {
			g.drawImage(bm, 0, 0, width, height, null);
			g.setColor(Color.white);
			g.drawString(s, 3, 3 + height / 2);
		}

	}

	@Override
	public void startState() {
		// TODO Auto-generated method stub

	}

	@Override
	public void stopState() {
		// TODO Auto-generated method stub

	}

	@Override
	public void seText(String text) {
		s = text;
	}

	@Override
	public String getString() {
		return s;
	}

	@Override
	public void setImage(BufferedImage bm) {

		this.bm = bm;
	}
}
