package myComp;

import java.applet.Applet;
import java.awt.Color;
import java.awt.GridBagConstraints;

import javax.swing.JApplet;
import javax.swing.JPanel;

import frame.canvas;
import stateManager.stateManager;

public class applet extends Applet {

	public applet() {
		this.setSize(650, 440);
		this.setSize(650, 440);
		this.setBackground(new Color(27, 27, 27));
		this.setVisible(true);
		stateManager SM = new stateManager(this);
	}

}
