package frame;

import java.awt.BasicStroke;
import java.awt.Canvas;
import java.awt.Color;
import java.awt.Dimension;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.Rectangle;
import java.awt.RenderingHints;
import java.awt.event.KeyEvent;
import java.awt.event.KeyListener;
import java.awt.event.MouseEvent;
import java.awt.event.MouseListener;
import java.awt.event.MouseMotionListener;
import java.awt.image.BufferStrategy;
import java.awt.image.BufferedImage;
import java.util.ArrayList;
import java.util.LinkedList;

import graphicalAssets.*;

public class canvas extends Canvas implements MouseListener, MouseMotionListener, KeyListener {
	drawable selected;
	BufferStrategy bs;
	public ArrayList<node> modify = new ArrayList<>();
	public ArrayList<edge> modifyE = new ArrayList<>();

	Graphics2D gg;
	public node_und_button_manager manager = new node_und_button_manager();;
	boolean drawRect = true;
	int rectX, rectY;
	private Rectangle r;

	public canvas() {
		this.setPreferredSize(new Dimension(500, 500));
		this.addMouseListener(this);
		this.addMouseMotionListener(this);
		this.setFocusable(false);

	}

	public void render() {

		if (this.getBufferStrategy() == null) {
			this.createBufferStrategy(3);
			bs = this.getBufferStrategy();

			frameRender();
		}

		gg = (Graphics2D) bs.getDrawGraphics();
		gg.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);

		gg.clearRect(0, 0, 500, 500);

		for (edge e : manager.edge_list) {
			e.draw(gg);
		}
		for (node n : manager.node_list) {
			n.draw(gg);
		}
		gg.setColor(new Color(0, 166, 81));
		gg.setStroke(new BasicStroke(1));

		if (r != null)
			gg.drawRect(r.x, r.y, r.width, r.height);
		gg.setColor(new Color(255, 193, 25));
		gg.fillRect(0, 10, 5, 380);

		bs.show();

	}

	public void paint(Graphics g) {
		frameRender();

	}

	@Override
	public void mouseClicked(MouseEvent arg0) {
		boolean empty = true;
		boolean selectE = true;

		for (node n : manager.node_list) {

			if (n.getBorder().contains(arg0.getX(), arg0.getY())) {
				selectE = false;

				if (modify.contains(n)) {
					modify.remove(n);
					empty = false;
					n.selected(false);
				} else {
					modify.add(n);
					n.selected(true);
					empty = false;
				}
			}

		}
		if (selectE) {
			for (edge e : manager.edge_list) {
				if (e.getBorder().intersects(new Rectangle(arg0.getX() - 10, arg0.getY() - 10, 20, 20))) {
					if (!modifyE.contains(e)) {
						e.selected(true);
						modifyE.add(e);
						empty = false;
					} else {
						e.selected(false);
						modifyE.remove(e);
					}

				}
			}
			;
		}
		if (empty)
			deselectAll();
		frameRender();
	}

	@Override
	public void mouseEntered(MouseEvent arg0) {
		// TODO Auto-generated method stub

	}

	@Override
	public void mouseExited(MouseEvent arg0) {
		// TODO Auto-generated method stub

	}

	@Override
	public void mousePressed(MouseEvent arg0) {
		for (node n : manager.node_list) {

			if (n.getBorder().contains(arg0.getX(), arg0.getY())) {
				selected = n;
				drawRect = false;

			}

		}
		if (drawRect) {
			rectX = arg0.getX();
			rectY = arg0.getY();
		}

	}

	@Override
	public void mouseReleased(MouseEvent arg0) {
		drawRect = true;
		r = null;
		selected = null;
		frameRender();
	}

	@Override
	public void mouseDragged(MouseEvent arg0) {

		if (selected != null && selected instanceof node) {
			if (arg0.getX() < 0 || arg0.getX() > this.getWidth() || arg0.getY() < 0
					|| arg0.getY() > this.getHeight() - 100)
				return;
			int gravityX = arg0.getX() - selected.getX();
			int gravityY = arg0.getY() - selected.getY();

			((node) selected).x = arg0.getX() - 15;
			((node) selected).y = arg0.getY() - 15;

			((node) selected).r.x = arg0.getX() - 15;
			((node) selected).r.y = arg0.getY() - 15;

			r = null;

		} else if (drawRect) {
			int x = Math.min(arg0.getX(), rectX);
			int y = Math.min(arg0.getY(), rectY);

			Rectangle R = new Rectangle(Math.min(arg0.getX(), rectX), Math.min(arg0.getY(), rectY),
					Math.abs(rectX - arg0.getX()), Math.abs(rectY - arg0.getY()));
			r = R;
			for (node n : manager.node_list) {
				if (n.getBorder().intersects(R)) {
					n.selected(true);
					if (!modify.contains(n))
						modify.add(n);

				} else {
					n.selected(false);
					modify.remove(n);
				}

			}
			for (edge e : manager.edge_list) {
				if (e.getBorder().intersects(R)) {
					e.selected(true);
					if (!modifyE.contains(e))
						modifyE.add(e);

				} else {
					e.selected(false);
					modifyE.remove(e);
				}

			}

		}
		frameRender();
	}

	@Override
	public void mouseMoved(MouseEvent arg0) {
		// TODO Auto-generated method stub

	}

	public void addNode(int n) {
		manager.AddNode(n);
		frameRender();

	}

	public void addEdge(int n, int m) {

		manager.AddEdge(n, m);
		frameRender();

	}

	public void addNodeT(int n) {
		manager.AddNode(n);

	}

	public void addEdgeT(int n, int m) {

		manager.AddEdge(n, m);

	}

	public void frameRender() {
		render();
		render();
	}

	@Override
	public void keyPressed(KeyEvent arg0) {

	}

	@Override
	public void keyReleased(KeyEvent arg0) {
		// TODO Auto-generated method stub

	}

	@Override
	public void keyTyped(KeyEvent arg0) {
		// TODO Auto-generated method stub

	}

	public void deselectAll() {

		for (drawable d : modify) {
			d.selected(false);
		}
		for (drawable d : modifyE) {
			d.selected(false);
		}
		try {
			modify.removeAll(modify);
			modifyE.removeAll(modifyE);
		} catch (Exception e) {
			;
		}
	}

	public void deleNode() {
		manager.deleNode(modify);
		frameRender();
	}

	public void createMultEdges() {
		for (int i = 0; i < modify.size(); ++i) {
			for (int j = 0; j < modify.size(); ++j) {
				try {
					addEdge(modify.get(j).getNumber(), modify.get(j + i + 1).getNumber());
				} catch (Exception e) {
				}
				;

			}

		}

	}

	public void deleteEdge() {
		manager.deleteEdge(modifyE);
		modifyE.removeAll(modifyE);
		frameRender();

	}

}
