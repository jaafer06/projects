package frame;

import java.awt.BorderLayout;

import java.awt.Color;
import java.awt.Graphics;
import java.awt.GridBagConstraints;
import java.awt.GridBagLayout;
import java.awt.Insets;
import java.awt.event.KeyEvent;
import java.awt.event.KeyListener;

import javax.swing.JComponent;
import javax.swing.JFrame;
import javax.swing.JPanel;

import graphicalAssets.edge;
import graphicalAssets.node;
import myComp.mainOptionPanel;
import stateManager.stateManager;
import myComp.*;

public class frame extends JFrame {
	public frame() {
		this.setResizable(false);
		this.setSize(650, 440);
		this.setDefaultCloseOperation(this.EXIT_ON_CLOSE);
		this.setBackground(new Color(27, 27, 27));

		this.setVisible(true);

	}

}
