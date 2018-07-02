package myComp;

import java.awt.Color;
import java.awt.Font;
import java.awt.Graphics;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.image.BufferedImage;

import javax.swing.JComponent;
import javax.swing.Timer;

public class transition implements state, ActionListener {
	Timer timer;
	Color[] color = new Color[5];
	normalButton nb;
	private int counter = -1;
	int width, height;
	String s;

	public transition(int width, int height, normalButton sb, String s) {
		this.nb = sb;
		color[0] = new Color(234, 179, 27);
		color[1] = new Color(194, 151, 33);
		color[2] = new Color(154, 123, 39);
		color[3] = new Color(114, 95, 45);
		color[4] = new Color(74, 67, 67);
		this.s = s;
		this.width = width;
		this.height = height;

		timer = new Timer(50, this);

	}

	@Override
	public void actionPerformed(ActionEvent e) {
		if (counter > 3) {
			nb.currentState = nb.steady;
			timer.stop();
			counter = 0;
			nb.repaint();
			return;
		}

		nb.repaint();

	}

	@Override
	public void render(Graphics g) {
		g.setFont(new Font("Arial", Font.PLAIN, 12));

		++counter;
		g.setColor(color[counter]);
		g.fillRect(0, 0, width, height);
		g.setColor(Color.white);
		g.drawString(s, 3, 3 + height / 2);

	}

	@Override
	public void startState() {
		timer.start();
	}

	@Override
	public void stopState() {
		timer.stop();
		counter = 0;

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
		// TODO Auto-generated method stub

	}

}
