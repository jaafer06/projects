package myComp;

import java.awt.GridBagConstraints;
import java.awt.GridBagLayout;
import java.awt.event.MouseEvent;
import java.awt.event.MouseListener;

import javax.swing.JComponent;

public class edgeButton extends JComponent implements observed, MouseListener {
	int index = 0;
	normalButton nb;
	normalButton text;
	normalButton add;
	observer o;
	int container = 0;

	public edgeButton(String s, String ss, int a, observer o) {

		this.o = o;

		nb = new ThisNB(63, 30, a, s, null);
		text = new textField(30, 30, a, null);
		text.setContainer(-1);
		add = new normalButton(30, 30, a, ss, o);
		add.removeMouseListener(add);
		add.addMouseListener(new listener(o));
		add.setContainer(-1);

		add.setVisible(false);
		nb.removeMouseListener(nb);
		text.removeMouseListener(text);
		nb.setContainer(-1);
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
		// TODO Auto-generated method stub
		return null;
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
		o.update(this);
		if (index != 1) {
			nb.mousePressed(null);
			text.mousePressed(null);
			add.SetText("from");
			add.setVisible(true);
			index = 0;
		}
	}

	@Override
	public void mouseReleased(MouseEvent e) {
		// TODO Auto-generated method stub

	}

	public void forceSteady() {
		nb.forceSteady();
		text.forceSteady();
		add.setVisible(false);
		index = 0;
		add.forceSteady();
	}

	public void setFocus(boolean b) {
		text.setFocusable(b);

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
			if (index == 0) {
				add.SetText("to");
				add.repaint();
				++index;
				text.SetText("");
				;
				return;
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
	public int getContainer() {
		// TODO Auto-generated method stub
		return container;
	}

	@Override
	public void setContainer(int c) {

		container = c;
	}

}
