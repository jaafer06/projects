package graphicalAssets;

import java.awt.BasicStroke;
import java.awt.Color;
import java.awt.Font;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.Rectangle;
import java.awt.Shape;

public class node implements drawable {
	public static int spacing = 10;

	public int x = spacing;
	public int y = spacing;
	Shape s;
	private int number;
	public Rectangle r;
	int width, height;
	private boolean isSelected = false;

	public node(int number) {
		this.number = number;
		width = 30;
		height = 30;
		r = new Rectangle(x, y, width, height);
		space();
	}

	public void refreshBound() {

		r = new Rectangle(x, y, width, height);

	}

	@Override
	public void draw(Graphics gg) {
		Graphics2D g = (Graphics2D) gg;
		try {

			g.setFont(new Font("Arial", Font.BOLD, 12));

			g.setColor(new Color(60, 60, 60));
			g.fillOval(x, y, 30, 30);
			g.setColor(Color.white);
			if (number / 100 != 0)
				g.drawString(number + "", x + 6, y + 18);
			else if (number / 10 != 0)
				g.drawString(number + "", x + 8, y + 18);
			else
				g.drawString(number + "", x + 11, y + 18);
			g.setStroke(new BasicStroke(2));
			g.setColor(new Color(0, 166, 81));
			if (isSelected)
				g.drawOval(x, y, 30, 30);
			;

		} catch (Exception e) {
		}
	}

	@Override
	public Shape getBorder() {
		// TODO Auto-generated method stub
		return r;
	}

	public void selected(boolean s) {
		isSelected = s;
	}

	@Override
	public int getX() {
		return x;
	}

	@Override
	public int getY() {
		return y;
	}

	public void space() {
		spacing += 30;
		if (spacing > 350)
			spacing = 20;
	}

	public int getNumber() {
		return number;
	}

}
