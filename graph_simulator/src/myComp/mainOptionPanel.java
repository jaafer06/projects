package myComp;

import java.awt.Color;
import java.awt.GridBagConstraints;
import java.awt.GridBagLayout;
import java.awt.Insets;
import java.awt.event.KeyEvent;
import java.awt.event.KeyListener;

import javax.swing.JButton;
import javax.swing.JOptionPane;
import javax.swing.JPanel;
import frame.*;
import graphicalAssets.edge;
import graphicalAssets.node;
import stateManager.stateManager;

public class mainOptionPanel extends JPanel implements observer, KeyListener {

	observed selected;
	observed last;

	int firstnode, secondnode;

	normalButton delN = new normalButton(93, 30, 2, "Delete Node(s)", this);;
	normalButton delE = new normalButton(93, 30, 4, "Delete Edge(s)", this);;
	normalButton mainM = new normalButton(93, 30, 8, "Main menu", this);;

	normalButton multe = new normalButton(93, 30, 3, "Add edge(s)", this);;
	normalButton reverse = new normalButton(93, 30, 6, "Reverse edge", this);;

	nodeButton node;
	nodeButton edgeWeight;

	normalButton sp = new normalButton(93, 30, 7, "Shortest path", this);

	stateManager sm;

	int placement = 0;
	canvas canvas;

	public mainOptionPanel(canvas canvas, stateManager sm) {
		this.sm = sm;
		delN.setSelectable(false);
		delE.setSelectable(false);
		multe.setSelectable(false);
		reverse.setSelectable(false);
		mainM.setSelectable(false);

		this.setLayout(new GridBagLayout());
		this.setBackground(new Color(27, 27, 27));
		this.setFocusable(false);
		this.canvas = canvas;

		GridBagConstraints gbc = new GridBagConstraints();

		gbc.gridy = placement++;
		gbc.anchor = gbc.WEST;
		gbc.insets.bottom = 3;

		gbc.gridy = placement++;
		node = new nodeButton("Add Node", "add", 1, this);
		this.add(node, gbc);

		gbc.insets.left = 10;
		gbc.gridy = placement++;
		this.add(delN, gbc);

		gbc.insets.left = 10;
		gbc.gridy = placement++;
		this.add(multe, gbc);

		gbc.insets.left = 10;
		gbc.gridy = placement++;
		this.add(delE, gbc);

		edgeWeight = new nodeButton("Set weight", "set", 5, this);

		gbc.insets.left = 0;
		gbc.gridy = placement++;
		this.add(edgeWeight, gbc);

		gbc.insets.left = 10;
		gbc.gridy = placement++;
		this.add(reverse, gbc);

		gbc.insets.left = 10;
		gbc.gridy = placement++;
		this.add(sp, gbc);

		gbc.insets.left = 10;
		gbc.gridy = placement++;
		this.add(mainM, gbc);

	}

	public void forceSteady() {

		node.forceSteady();
		delN.forceSteady();
		multe.forceSteady();
		delE.forceSteady();
		edgeWeight.forceSteady();
		reverse.forceSteady();
		sp.forceSteady();
		mainM.forceSteady();

	}

	@Override
	public void update(observed observed) {

	}

	@Override
	public void updateAction(observed observed, int a) {

		if (observed.getAction() == 1) {
			canvas.addNode(a);

		} else if (observed.getAction() == 2) {

			canvas.deleNode();
			canvas.modify.removeAll(canvas.modify);

		} else if (observed.getAction() == 3) {
			canvas.createMultEdges();

		} else if (observed.getAction() == 4) {
			canvas.deleteEdge();
		} else if (observed.getAction() == 5) {
			if (canvas.modifyE.size() == 0) {
				JOptionPane.showMessageDialog(canvas, "you need to select at least one edge to modify its weight ");
				return;
			}
			// bad implementation but have no time
			for (edge e : canvas.modifyE) {
				e.setWeight(a);
			}
		} else if (observed.getAction() == 6) {
			if (canvas.modifyE.size() == 0) {
				JOptionPane.showMessageDialog(canvas, "you need to select at least one edge to reverse the direction ");
				return;
			}
			for (edge e : canvas.modifyE) {
				e.reverse();
			}

		} else if (observed.getAction() == 7) {
			boolean error = true;
			int s = 0, e = 0;
			String start, end = null;
			while (error) {
				try {
					start = JOptionPane.showInputDialog(canvas, "Enter starting node");
					if (start == null) {
						observed.forceSteady();
						return;
					}
					s = Integer.parseInt(start);
					if (!canvas.manager.isNode(s))
						throw new Exception();

					end = JOptionPane.showInputDialog(canvas, "Enter destination");
					if (end == null) {
						observed.forceSteady();
						return;
					}
					e = Integer.parseInt(end);
					if (!canvas.manager.isNode(e))
						throw new Exception();

					error = false;
				} catch (Exception ee) {
					JOptionPane.showMessageDialog(canvas, "your input is not valid");
				}
			}
			canvas.manager.dijkstra(canvas.manager.getNode(s), canvas.manager.getNode(e));
			observed.forceSteady();
		} else if (observed.getAction() == 8) {
			;
			sm.setMenu();
		}

		canvas.frameRender();

	}

	@Override
	public void sub(observed o) {
		// TODO Auto-generated method stub

	}

	@Override
	public void keyPressed(KeyEvent arg0) {

		if (arg0.getKeyCode() == 127) {
			canvas.deleteEdge();
			canvas.deleNode();
		}
		if (arg0.getKeyCode() == 10) {

			if (node.getState() instanceof selected) {
				updateAction(node, node.getNum());
			}
			if (edgeWeight.getState() instanceof selected) {
				updateAction(edgeWeight, edgeWeight.getNum());
			}

		}

	}

	@Override
	public void keyReleased(KeyEvent arg0) {
		// TODO Auto-generated method stub

	}

	@Override
	public void keyTyped(KeyEvent arg0) {
		// TODO Auto-generated method stub

	}

}
