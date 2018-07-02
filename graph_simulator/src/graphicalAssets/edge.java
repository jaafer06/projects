package graphicalAssets;

import java.awt.BasicStroke;
import java.awt.Color;
import java.awt.Font;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.Rectangle;
import java.awt.Shape;
import java.awt.Stroke;
import java.awt.geom.AffineTransform;
import java.awt.geom.Line2D;

public class edge implements drawable {
	private node fn, sn;
	private int weight = 1;
	public boolean direction = true;
	Shape r;
	private boolean isSelected = false;
	public boolean d = false;

	@Override
	public void draw(Graphics g) {

		Graphics2D gg = (Graphics2D) g;

		gg.setStroke(new BasicStroke(3));
		gg.setColor(new Color(255, 192, 25));
		r = new Line2D.Double(fn.getX() + fn.width / 2, fn.getY() + fn.height / 2, sn.getX() + sn.width / 2,
				sn.getY() + sn.height / 2);
		int x1 = this.getFirst().getX() + fn.width / 2;
		int x2 = this.getSecond().getX() + sn.width / 2;
		int y1 = this.getFirst().getY() + fn.height / 2;
		int y2 = this.getSecond().getY() + sn.height / 2;
		gg.setFont(new Font("Arial", Font.BOLD, 12));

		if (isSelected) {
			gg.setColor(new Color(0, 166, 81));
			gg.setStroke(new BasicStroke(4));

		}
		if (direction) {
			if (d) {
				drawArrow2(gg, x1 + 8, y1 - 8, x2 + 8, y2 - 8);
				r = new Line2D.Double(x1 + 8, y1 - 8, x2 + 8, y2 - 8);
				gg.setColor(Color.white);

				gg.drawString("" + weight, ((x1 + 8) + (x2 + 8)) / 2, (y1 - 8 + y2 - 8) / 2);

			} else
				drawArrow(gg, x1, y1, x2, y2);

		} else {

			if (d) {
				drawArrow2(gg, x1 - 8, y1 + 8, x2 - 8, y2 + 8);
				r = new Line2D.Double(x2 - 8, y2 + 8, x1 - 8, y1 + 8);
				gg.setColor(Color.white);

				gg.drawString("" + weight, ((x1 + 8) + (x2 - 8)) / 2, (y1 + 8 + y2 + 8 + 10) / 2);

			} else
				drawArrow(g, x1, y1, x2, y2);
		}

		//

		//

		gg.setColor(Color.white);
		if (!d)
			gg.drawString("" + weight, ((fn.getX() + fn.width / 2 + sn.width / 2 + sn.getX()) / 2),
					(fn.getY() + fn.height / 2 + sn.height / 2 + sn.getY()) / 2);

	}

	public edge(node fn, node sn) {
		this.fn = fn;
		this.sn = sn;

	}

	public edge(int fn, int sn) {
		this.fn = new node(fn);
		this.sn = new node(sn);

	}

	@Override
	public Shape getBorder() {

		return r;
	}

	@Override
	public int getX() {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public int getY() {
		// TODO Auto-generated method stub
		return 0;
	}

	public node getFirst() {
		if (direction)
			return this.fn;
		return this.sn;
	}

	public node getSecond() {
		if (direction)
			return this.sn;
		return this.fn;
	}

	public void selected(boolean s) {
		isSelected = s;
	}

	public void setWeight(int i) {
		weight = i;
	}

	void drawArrow(Graphics g1, int x1, int y1, int x2, int y2) {
		int ARR_SIZE = 7;

		Graphics2D g = (Graphics2D) g1.create();

		double dx = x2 - x1, dy = y2 - y1;
		double angle = Math.atan2(dy, dx);
		int len = (int) Math.sqrt(dx * dx + dy * dy);
		AffineTransform at = AffineTransform.getTranslateInstance(x1, y1);
		at.concatenate(AffineTransform.getRotateInstance(angle));
		g.transform(at);

		// Draw horizontal arrow starting in (0, 0)
		g.drawLine(0, 0, len, 0);
		g.fillPolygon(new int[] { len - 10, len - ARR_SIZE - 20, len - ARR_SIZE - 20, len - 10 },
				new int[] { 0, -ARR_SIZE, ARR_SIZE, 0 }, 4);
	}

	void drawArrow2(Graphics g1, int x1, int y1, int x2, int y2) {
		int ARR_SIZE = 7;

		Graphics2D g = (Graphics2D) g1.create();

		double dx = x2 - x1, dy = y2 - y1;
		double angle = Math.atan2(dy, dx);
		int len = (int) Math.sqrt(dx * dx + dy * dy);
		AffineTransform at = AffineTransform.getTranslateInstance(x1, y1);
		at.concatenate(AffineTransform.getRotateInstance(angle));
		g.transform(at);

		// Draw horizontal arrow starting in (0, 0)
		g.drawLine(0, 0, len, 0);
		g.fillPolygon(new int[] { len - 0 - len / 2, len - ARR_SIZE - len / 2 - 5, len - ARR_SIZE - len / 2 - 5,
				len - 0 - len / 2 }, new int[] { 0, -ARR_SIZE, ARR_SIZE, 0 }, 4);
	}

	public void reverse() {
		this.direction = !direction;
	}

	public int getWeight() {
		return weight;
	}

	public void setDirection(boolean direction) {
		this.direction = direction;
	}

	public node getFirstC() {
		return fn;
	}

	public node getSecondC() {
		return sn;
	}

}
