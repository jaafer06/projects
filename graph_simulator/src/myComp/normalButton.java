package myComp;

import java.awt.Color;
import java.awt.Dimension;
import java.awt.Graphics;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.MouseEvent;
import java.awt.event.MouseListener;
import java.util.ArrayList;

import javax.swing.Timer;
import javax.swing.JComponent;

public class normalButton extends JComponent implements MouseListener, observed {
	public state currentState;
	private boolean tran = true;
	int action;
	int width, height;
	private boolean hoverable = true;
	private boolean selectable = true;
	protected state selected, hover, steady, transition;
	public boolean updateAction = true;
	protected int container = 0;
	protected boolean visible = true;
	observer observer;

	public normalButton(int width, int height) {
		selected = new selected(width, height, new Color(255, 193, 25), this);
		hover = new hover(width, height, new Color(255, 193, 25), "");
		steady = new steady(width, height, new Color(54, 54, 54), "");
		transition = new transition(width, height, this, "");
		currentState = steady;
		this.setSize(new Dimension(width, height));
		this.setMaximumSize(new Dimension(width, height));
		this.setMinimumSize(new Dimension(width, height));
		this.setPreferredSize(new Dimension(width, height));
		this.addMouseListener(this);
		this.width = width;
		this.height = height;

		this.setContainer(0);
	}

	public normalButton(int width, int height, int i, String s, observer o) {
		this(width, height);
		this.SetText(s);
		this.setAction(i);
		if (o != null) {
			o.sub(this);
			this.observer = o;
		}

	}

	public void paint(Graphics g) {
		if (visible == true) {
			currentState.render(g);
			g.setColor(new Color(168, 168, 168));
		}

	}

	public void SetText(String s) {
		selected.seText(s);
		steady.seText(s);
		transition.seText(s);
		hover.seText(s);

	}

	public String getText() {
		return currentState.getString();
	}

	public int getAction() {
		return action;
	}

	public void setAction(int a) {
		action = a;
	}

	@Override
	public void mouseClicked(MouseEvent arg0) {

	}

	@Override
	public void mouseEntered(MouseEvent arg0) {
		if (hoverable) {
			if (currentState instanceof selected)
				return;
			transition.stopState();
			currentState = hover;
			repaint();
		}

	}

	@Override
	public void mouseExited(MouseEvent arg0) {
		if (!tran && currentState instanceof hover) {
			currentState = steady;
			repaint();
			return;
		}
		if (currentState instanceof hover) {
			currentState = transition;
			currentState.startState();
		}

	}

	@Override
	public void mousePressed(MouseEvent arg0) {
		manager.getFocus(this);
		setState(selected);
		if (!selectable) {
			setState(hover);
		}

		repaint();
		if (observer != null) {

			observer.update(this);
			if (updateAction)

				observer.updateAction(this, 0);

		}

	}

	@Override
	public void mouseReleased(MouseEvent arg0) {
		// TODO Auto-generated method stub

	}

	public void setTransition(boolean tran) {
		this.tran = tran;
	}

	public void setState(state s) {
		currentState = s;
		s.startState();
		repaint();
	}

	public void setObserver(observer o) {
		this.observer = o;
	}

	public void setVisible(boolean vis) {
		visible = vis;
		repaint();
	}

	public boolean getVisibility() {
		return visible;
	}

	public void forceSteady() {
		currentState.stopState();
		this.currentState = steady;
		repaint();
	}

	public void setHoverable(boolean hov) {
		this.hoverable = hov;
	}

	@Override
	public state getState() {
		return currentState;
	}

	public void setActionUpdate() {
		this.updateAction = true;
	}

	public void setSelectable(boolean b) {
		this.selectable = b;
	}

	@Override
	public void setFocus(boolean b) {

		this.setFocusable(b);
	}

	public void setContainer(int c) {

		this.container = c;
		manager.setContainer(this, c);
	}

	public manager getManager() {
		return new manager();
	}

	public static class manager {

		private static ArrayList<ArrayList<observed>> container = new ArrayList<>();
		private static ArrayList<observed> current = new ArrayList<>();

		public manager() {
		};

		public manager(observed o, int i) {
			if (container.get(i) == null)
				container.set(i, new ArrayList<>());
			container.get(i).add(o);

		}

		static void setContainer(observed o, int c) {
			if (c == -1)
				return;
			try {
				if (container.get(c) == null)
					;
			} catch (Exception e) {
				container.add(c, new ArrayList<observed>());
			}

			container.get(o.getContainer()).remove(o);
			container.get(c).add(o);
			current.add(c, null);

		}

		static void getFocus(observed o) {
			if (o.getContainer() < 0)
				return;

			if (current.get(o.getContainer()) == null) {
				current.set(o.getContainer(), o);
				;
				return;
			}
			if (o != current.get(o.getContainer())) {
				current.get(o.getContainer()).forceSteady();
				current.set(o.getContainer(), o);
			}

		}

	}

	@Override
	public int getContainer() {
		return this.container;
	}

}
