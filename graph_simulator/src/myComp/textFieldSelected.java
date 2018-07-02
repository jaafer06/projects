package myComp;

import java.awt.Color;
import java.awt.Font;
import java.awt.Graphics;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import javax.swing.Timer;

public class textFieldSelected extends selected implements state, ActionListener {

	Timer timer;
	boolean tick = true;
	public String strich = "|";

	public textFieldSelected(int width, int height, Color c, textField f) {
		super(width, height, c, f);

		timer = new Timer(400, this);

	}

	@Override
	public void render(Graphics g) {
		g.setFont(new Font("Arial", Font.BOLD, 13));

		g.setColor(c);
		g.fillRect(0, 0, width, height);
		g.setColor(Color.white);
		g.drawString(s + strich, 3, 3 + height / 2);

	}

	@Override
	public void actionPerformed(ActionEvent arg0) {
		tick = !tick;
		if (tick)
			strich = "|";
		else
			strich = "";
		comp.repaint();

	}

	@Override
	public void startState() {
		timer.start();
		s = "";

	}

	@Override
	public void stopState() {

		timer.stop();
	}

}