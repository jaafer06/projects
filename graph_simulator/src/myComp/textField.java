package myComp;

import java.awt.Color;
import java.awt.Dimension;
import java.awt.Graphics;
import java.awt.event.KeyEvent;
import java.awt.event.KeyListener;
import java.awt.event.MouseEvent;
import java.awt.event.MouseListener;
import java.util.ArrayList;

import javax.swing.JComponent;
import javax.swing.Timer;

public class textField extends normalButton implements KeyListener {
	static key key;

	public textField(int width, int height, int a, observer o) {
		super(width, height, a, "", o);
		selected = new textFieldSelected(width, height, new Color(255, 193, 25), this);
		currentState = steady;
		this.setSize(new Dimension(width, height));
		this.setMaximumSize(new Dimension(width, height));
		this.setMinimumSize(new Dimension(width, height));
		this.setPreferredSize(new Dimension(width, height));
		this.setAction(a);
		key = new key(this);
		this.addKeyListener(key);
		this.setFocusable(true);
	}

	public void paint(Graphics g) {

		if (visible)
			currentState.render(g);
	}

	public void SetText(String s) {

		currentState.seText(s);

		repaint();
	}

	public String getText() {

		return currentState.getString();
	}

	public void mousePressed(MouseEvent arg0) {

		key.getFocus(this);
		manager.getFocus(this);
		currentState = selected;
		selected.startState();
		repaint();
		if (observer != null) {
			observer.update(this);
		}
	}

	public static KeyListener getKey() {
		return key;
	}

	@Override
	public void keyPressed(KeyEvent arg0) {
		if (currentState instanceof selected)
			this.SetText(this.getText() + arg0.getKeyChar());
	}

	@Override
	public void keyReleased(KeyEvent arg0) {
		// TODO Auto-generated method stub

	}

	@Override
	public void keyTyped(KeyEvent arg0) {
		// TODO Auto-generated method stub

	}

	static class key implements KeyListener {
		static textField focused;
		static ArrayList<textField> list = new ArrayList<>();

		key(textField t) {
			list.add(t);
		}

		@Override
		public void keyPressed(KeyEvent arg0) {

			if (focused != null) {
				if (focused.currentState instanceof textFieldSelected) {
					if (arg0.getKeyCode() == 8 && focused.getText().length() > 0) {
						focused.SetText(focused.getText().substring(0, focused.getText().length() - 1));
						return;
					}
					if (arg0.getKeyChar() >= (int) '0' && arg0.getKeyChar() <= (int) '9'
							&& focused.getText().length() <= 2)
						focused.SetText(focused.getText() + arg0.getKeyChar());
				}
			}

		}

		@Override
		public void keyReleased(KeyEvent arg0) {
			// TODO Auto-generated method stub

		}

		@Override
		public void keyTyped(KeyEvent arg0) {

		}

		public static void getFocus(textField t) {
			focused = t;
			t.setFocusable(true);
			for (textField tf : list) {

				if (tf != t)
					tf.setFocusable(false);
			}

		}

	}

}
