package graphicalAssets;

import java.awt.Graphics;
import java.awt.Shape;

public interface drawable {

	public void draw(Graphics g);

	public Shape getBorder();

	public int getX();

	public int getY();

	public void selected(boolean s);

}
