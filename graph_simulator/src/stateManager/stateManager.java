package stateManager;

import java.awt.event.KeyEvent;
import java.awt.event.KeyListener;

import javax.swing.JApplet;
import javax.swing.JFrame;

import frame.frame;
import myComp.applet;

public class stateManager implements KeyListener {

	// to change
	public state current;
	applet a;
	private boolean first = true;
	private state menu;
	private state graph;
	private state savedState;

	private frame f;

	public void setState(state s) {
		if (a == null)
			current.ShutDown();
		current = s;
		current.set();
	}

	public stateManager(frame f) {
		this.f = f;
		f.addKeyListener(this);
		graph = new graph(f, this);
		menu = new Menu(f, graph, this);

		current = menu;
		setState(menu);

	}

	public stateManager(applet a) {
		this.a = a;
		a.addKeyListener(this);
		graph = new graph(a);

		setState(graph);

	}

	@Override

	public void keyPressed(KeyEvent arg0) {

	}

	@Override
	public void keyReleased(KeyEvent arg0) {
		if (first)
			return;
		if (a != null)
			return;
		if (arg0.getKeyCode() == 27) {
			current.forceSteady();
			if (current == graph)
				setState(menu);
			else if (current == menu)
				setState(graph);

			current.forceSteady();

		}
	}

	@Override
	public void keyTyped(KeyEvent arg0) {
		// TODO Auto-generated method stub

	}

	public void notF() {
		this.first = false;
	}

	public void setMenu() {
		this.menu.forceSteady();
		this.setState(menu);
	}
}
