package stateManager;

import java.awt.BorderLayout;
import java.awt.Color;
import java.awt.GridBagConstraints;
import java.awt.Insets;

import javax.swing.JFrame;
import javax.swing.JPanel;

import frame.canvas;
import frame.frame;
import graphicalAssets.edge;
import myComp.applet;
import myComp.mainOptionPanel;
import myComp.textField;

public class graph implements state {
	frame f;
	JPanel p1;
	// to change
	public canvas c;
	mainOptionPanel mainP;
	GridBagConstraints gbc;
	applet a;
	stateManager sm;

	public graph(frame f, stateManager sm) {
		this.sm = sm;
		this.f = f;
		gbc = new GridBagConstraints();
		p1 = new JPanel();
		p1.setBackground(new Color(27, 27, 27));

		gbc.insets = new Insets(3, 3, 3, 3);
		c = new canvas();
		mainP = new mainOptionPanel(c, sm);

		p1.add(c);
		f.addKeyListener(textField.getKey());
		f.addKeyListener(mainP);

	}

	public graph(applet a) {
		this.a = a;
		gbc = new GridBagConstraints();
		p1 = new JPanel();
		p1.setBackground(new Color(27, 27, 27));

		gbc.insets = new Insets(3, 3, 3, 3);
		c = new canvas();
		mainP = new mainOptionPanel(c, null);

		p1.add(c);
		a.addKeyListener(textField.getKey());
		c.addNodeT(5);
		c.addNodeT(3);
		c.addNodeT(17);
		c.addNodeT(22);
		c.addNodeT(1);
		c.addNodeT(555);

		c.addEdgeT(5, 3);
		c.addEdgeT(1, 22);
		c.addEdgeT(17, 3);
		c.addEdgeT(5, 22);
		c.addEdgeT(1, 5);
		c.addEdgeT(555, 22);
		c.addEdgeT(555, 1);
		c.addEdgeT(555, 3);

	}

	public void set() {
		sm.notF();

		if (a != null) {
			a.addKeyListener(c);
			a.add(mainP, BorderLayout.WEST);
			a.add(p1, BorderLayout.CENTER);

			a.setVisible(true);

			a.repaint();
			return;
		}
		f.addKeyListener(c);
		f.add(mainP, BorderLayout.WEST);
		f.add(p1, BorderLayout.CENTER);
		c.frameRender();

		f.setVisible(true);

		f.repaint();

	}

	public void ShutDown() {
		f.remove(p1);
		f.remove(mainP);
		f.removeKeyListener(c);

	}

	public void forceSteady() {
		mainP.forceSteady();
	}

}
