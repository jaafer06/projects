package myComp;

import java.awt.Color;
import java.awt.Graphics;

public class ThisNB extends normalButton {

	public ThisNB(int width, int height, int i, String s, observer o) {
		super(width, height, i, s, o);
		// TODO Auto-generated constructor stub
		this.setAction(i);
		this.SetText(s);
	}

	public void paint(Graphics g) {
		if (visible == true) {
			currentState.render(g);
			g.setColor(new Color(168, 168, 168));
			g.drawString("|", width - 3, height * 3 / 5);
		}

	}

}
