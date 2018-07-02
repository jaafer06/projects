package stateManager;

import java.awt.Color;
import java.awt.GridBagConstraints;
import java.awt.GridBagLayout;
import java.util.ArrayList;

import javax.swing.JOptionPane;
import javax.swing.JPanel;

import frame.frame;
import graphicalAssets.edge;
import graphicalAssets.node;
import myComp.*;

public class Menu implements state, observer {
	private boolean first = true;

	ArrayList<node> node_list = new ArrayList<>();
	ArrayList<edge> edge_list = new ArrayList<>();
	frame f;
	graph g;
	JPanel p;
	normalButton save;
	normalButton load;
	normalButton resume;
	normalButton newG;
	normalButton exit;
	normalButton test;

	stateManager sm;

	public Menu(frame f, state graph, stateManager sm) {
		this.sm = sm;
		this.f = f;
		this.g = (graph) graph;
		resume = new normalButton(93, 30, 3, "Resume", this);
		newG = new normalButton(93, 30, 10, "New graph", this);
		exit = new normalButton(93, 30, 2, "Exit", this);
		test = new normalButton(93, 30, 4, "Load test graph", this);

		save = new normalButton(93, 30, 0, "Save graph", this);
		load = new normalButton(93, 30, 1, "Load graph", this);
		load.setContainer(1);
		resume.setContainer(1);
		save.setContainer(1);
		exit.setContainer(1);
		newG.setContainer(1);
		test.setContainer(1);

		load.setSelectable(false);
		resume.setSelectable(false);
		exit.setSelectable(false);
		newG.setSelectable(false);
		save.setSelectable(false);
		test.setSelectable(false);
		p = new mainPane(true);

	}

	@Override
	public void set() {
		if (!first)
			p = new mainPane(false);

		f.add(p);
		this.edge_list = g.c.manager.edge_list;
		this.node_list = g.c.manager.node_list;
		f.setVisible(true);
		f.repaint();

	}

	@Override
	public void ShutDown() {
		f.remove(p);

	}

	@Override
	public void update(observed observed) {
		// TODO Auto-generated method stub

	}

	@Override
	public void updateAction(observed observed, int a) {

		if (observed.getAction() == 0) {
			fileSaver.saveFile(f, node_list, edge_list);

		} else if (observed.getAction() == 1) {
			result r = fileLoader.getData(f, false);
			if (r == null)
				return;
			g.c.manager.node_list.removeAll(g.c.manager.node_list);
			g.c.manager.edge_list.removeAll(g.c.manager.edge_list);
			g.c.manager.node_list = r.n;
			g.c.manager.edge_list = r.e;
			save.forceSteady();
			load.forceSteady();
			sm.setState(g);

		} else if (observed.getAction() == 10) {
			int c = 1;
			if (!first)
				c = JOptionPane.showConfirmDialog(f, "do you want to save the current graph ?");
			if (c == 2 || c == -1)
				return;
			else if (c == 0)
				fileSaver.saveFile(f, node_list, edge_list);
			g.c.manager.node_list.removeAll(g.c.manager.node_list);
			g.c.manager.edge_list.removeAll(g.c.manager.edge_list);

			save.forceSteady();
			load.forceSteady();
			sm.setState(g);

		} else if (observed.getAction() == 2) {

			System.exit(0);

		} else if (observed.getAction() == 3) {
			sm.setState(g);

		} else if (observed.getAction() == 4) {

			result r = fileLoader.getData(f, true);

			if (r == null)
				return;
			int c = 1;
			if (!first)
				c = JOptionPane.showConfirmDialog(f, "do you want to save the current graph ?");
			if (c == 2 || c == -1)
				return;
			else if (c == 0)
				fileSaver.saveFile(f, node_list, edge_list);

			g.c.manager.node_list.removeAll(g.c.manager.node_list);
			g.c.manager.edge_list.removeAll(g.c.manager.edge_list);
			g.c.manager.node_list = r.n;
			g.c.manager.edge_list = r.e;
			save.forceSteady();
			load.forceSteady();
			sm.setState(g);
		}

		first = false;
		g.forceSteady();

	}

	@Override
	public void sub(observed o) {

	}

	public void forceSteady() {

		resume.forceSteady();
		newG.forceSteady();
		load.forceSteady();
		save.forceSteady();
		exit.forceSteady();
		test.forceSteady();
	}

	private class mainPane extends JPanel {

		public mainPane(boolean first) {

			this.setLayout(new GridBagLayout());
			this.setBackground(new Color(27, 27, 27));
			this.setFocusable(false);
			GridBagConstraints gbc = new GridBagConstraints();
			int placement = 0;
			gbc.anchor = GridBagConstraints.CENTER;
			gbc.insets.bottom = 5;

			if (!first) {

				gbc.gridy = placement++;
				this.add(resume, gbc);
			}

			gbc.gridy = placement++;
			this.add(newG, gbc);

			gbc.gridy = placement++;
			this.add(load, gbc);

			gbc.gridy = placement++;
			this.add(test, gbc);

			if (!first) {

				gbc.gridy = placement++;
				this.add(save, gbc);
			}

			gbc.gridy = placement++;
			this.add(exit, gbc);

		}

	}

}
