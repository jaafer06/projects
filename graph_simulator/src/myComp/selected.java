package myComp;

import java.awt.Color;
import java.awt.Font;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.RenderingHints;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.image.BufferedImage;

import javax.swing.JComponent;
import javax.swing.Timer;

public class selected implements state {
	BufferedImage bm;
	int width, height;
	Color c;
	public String s = "";
	JComponent comp;

	public selected(int width, int height, Color c, JComponent f) {
		this.width = width;
		this.height = height;
		this.c = c;
		comp = f;

	}

	public selected(int width, int height, BufferedImage bm, String s) {
		this.s = s;
		this.width = width;
		this.height = height;
		this.bm = bm;

	}

	@Override
	public void render(Graphics gg) {
		Graphics2D g = (Graphics2D) gg;
		g.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);
		g.setFont(new Font("Arial", Font.BOLD, 12));

		if (bm == null) {
			g.setColor(c);
			g.fillRect(0, 0, width, height);
			g.setColor(Color.white);
			g.drawString(s, 3, 3 + height / 2);
		} else {
			g.drawImage(bm, 0, 0, width, height, null);
			g.setColor(Color.white);
			g.drawString(s, 3, 3 + height / 2);
		}

	}

	@Override
	public void startState() {

	}

	@Override
	public void stopState() {

	}

	@Override
	public void seText(String text) {

		s = text;
	}

	@Override
	public String getString() {
		// TODO Auto-generated method stub
		return s;
	}

	@Override
	public void setImage(BufferedImage bm) {

		this.bm = bm;
	}

}