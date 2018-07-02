package myComp;

import java.awt.event.MouseEvent;

public class addButton extends normalButton {

	public addButton(int width, int height) {
		super(width, height);
		// TODO Auto-generated constructor stub
	}

	public addButton(int width, int height, int a, String s, observer o) {
		super(width, height, a, s, o);
		// TODO Auto-generated constructor stub

	}

	@Override
	public void mouseClicked(MouseEvent arg0) {
		if (observer != null) {
			observer.updateAction(this, 0);
		}

		if (this.getVisibility() == false)
			return;

		currentState = steady;
		selected.startState();
		this.setVisible(false);
		repaint();

	}

	@Override
	public void forceSteady() {
		this.setVisible(false);
		this.setState(this.steady);
		this.repaint();

	}
}
