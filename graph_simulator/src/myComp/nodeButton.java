package myComp;

import java.awt.Dimension;
import java.awt.GridBagConstraints;
import java.awt.GridBagLayout;
import java.awt.event.KeyEvent;
import java.awt.event.KeyListener;
import java.awt.event.MouseEvent;
import java.awt.event.MouseListener;

import javax.swing.JComponent;

import myComp.normalButton.manager;
import myComp.textField.key;

public class nodeButton extends JComponent implements observed, MouseListener {
	normalButton nb;
	normalButton text;
	normalButton add;
	observer o;
	int container = 0;

	public nodeButton(String s, String ss, int a, observer o) {

		this.o = o;
		nb = new ThisNB(63, 30, a, s, null);
		text = new textField(30, 30, a, null);
		text.setContainer(-1);
		add = new normalButton(30, 30, a, ss, o);
		add.removeMouseListener(add);
		add.setContainer(-1);
		add.addMouseListener(new listener(o));
		add.setVisible(false);
		nb.removeMouseListener(nb);
		nb.setContainer(-1);
		text.removeMouseListener(text);
		this.addMouseListener(this);

		this.setLayout(new GridBagLayout());
		GridBagConstraints gbc = new GridBagConstraints();
		gbc.anchor = gbc.WEST;
		gbc.insets.left = 10;
		this.add(nb, gbc);
		gbc.insets.left = 0;
		this.add(text, gbc);

		gbc.insets.left = 3;
		this.add(add, gbc);

	}

	@Override
	public int getAction() {
		return nb.getAction();

	}

	@Override
	public state getState() {
		return nb.currentState;
	}

	@Override
	public void mouseClicked(MouseEvent e) {

	}

	@Override
	public void mouseEntered(MouseEvent e) {
		nb.mouseEntered(null);
		text.mouseEntered(null);
	}

	@Override
	public void mouseExited(MouseEvent e) {
		nb.mouseExited(null);
		text.mouseExited(null);
	}

	@Override
	public void mousePressed(MouseEvent e) {
		nb.getManager().getFocus(this);

		nb.mousePressed(null);
		text.mousePressed(null);
		add.setVisible(true);
		o.update(this);
	}

	@Override
	public void mouseReleased(MouseEvent e) {
		// TODO Auto-generated method stub

	}

	public int getNum() {
		int n = 0;
		try {
			n = Integer.parseInt(text.getText());
		} catch (Exception e) {
		}
		text.SetText("");
		return n;

	}

	@Override

	public void forceSteady() {
		nb.forceSteady();
		text.forceSteady();
		add.setVisible(false);
		add.forceSteady();
	}

	public int getContainer() {
		return container;
	}

	private class listener implements MouseListener {
		observer observer;

		listener(observer observer) {
			this.observer = observer;
		}

		@Override
		public void mouseClicked(MouseEvent e) {

			if (observer != null && text.getText().length() > 0) {
				observer.updateAction(add, Integer.parseInt(text.getText()));
			}

			if (add.getVisibility() == false)
				return;

			add.currentState = add.steady;
			add.selected.startState();
			add.setVisible(false);
			repaint();

			forceSteady();

		}

		@Override
		public void mouseEntered(MouseEvent e) {
			add.mouseEntered(null);
		}

		@Override
		public void mouseExited(MouseEvent e) {
			add.mouseExited(null);
		}

		@Override
		public void mousePressed(MouseEvent e) {
			// TODO Auto-generated method stub

		}

		@Override
		public void mouseReleased(MouseEvent e) {
			// TODO Auto-generated method stub

		}
	}

	@Override
	public void setFocus(boolean b) {
		text.setFocusable(b);
	}

	@Override
	public void setContainer(int c) {

		container = c;
	}

}
