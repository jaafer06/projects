package frame;

import java.awt.Canvas;
import java.awt.Color;
import java.awt.Font;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.RenderingHints;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.Objects;

import javax.swing.JFrame;

import graphicalAssets.edge;
import graphicalAssets.node;

public class node_und_button_manager implements Runnable {

	public ArrayList<node> node_list = new ArrayList<>();;
	public ArrayList<edge> edge_list = new ArrayList<>();;
	public ArrayList<node> sp = new ArrayList<>();;
	Thread t;

	public boolean isNode(int n) {

		for (node node : node_list)
			if (node.getNumber() == n)
				return true;
		return false;

	}

	private edge isEdge(int n, int m) {
		for (edge edge : edge_list)
			if ((edge.getFirst().getNumber() == n && edge.getSecond().getNumber() == m)
					|| (edge.getFirst().getNumber() == m && edge.getSecond().getNumber() == n))
				return edge;

		return null;
	}

	public void AddNode(int n) {
		if (!isNode(n))
			node_list.add(new node(n));

	}

	public void AddEdge(int n, int m) {

		if (isEdge(n, m) == null) {
			AddNode(n);
			AddNode(m);
			edge_list.add(new edge(getNode(n), getNode(m)));

			return;

		} else {
			node f;
			node s;
			if (getEdge(getNode(n), getNode(m)) != null) {
				f = getNode(n);
				s = getNode(m);
			} else {
				f = getNode(m);
				s = getNode(n);
			}

			if (getEdge(f, s) == null || getEdge(s, f) == null) {
				edge temp2;
				if (getEdge(f, s) == null)
					temp2 = getEdge(s, f);
				else
					temp2 = getEdge(f, s);

				edge temp;
				if (temp2.direction) {
					temp = new edge(temp2.getFirst(), temp2.getSecond());
					temp.direction = false;
				} else {
					temp = new edge(temp2.getSecond(), temp2.getFirst());
					temp.direction = true;
					;
				}

				temp2.d = true;
				temp.d = true;

				edge_list.add(temp);

			}

		}
	}

	public edge getEdge(node f, node s) {
		for (edge e : edge_list) {
			if (e.getFirst().getNumber() == f.getNumber() && e.getSecond().getNumber() == s.getNumber())
				return e;
		}

		return null;

	}

	public edge getLastEdge(node f, node s) {
		edge ee = null;
		for (edge e : edge_list) {
			if (e.getFirst().getNumber() == f.getNumber() && e.getSecond().getNumber() == s.getNumber())
				ee = e;
		}

		return ee;

	}

	public node getNode(int n) {
		for (node node : node_list)
			if (node.getNumber() == n)
				return node;
		return null;

	}

	public void deleNode(ArrayList<node> modify2) {

		for (node n : modify2) {
			for (node nn : node_list) {
				if (isEdge(n.getNumber(), nn.getNumber()) != null)
					edge_list.remove(getEdge(n, nn));
				edge_list.remove(getEdge(nn, n));
			}
			node_list.remove(n);
		}
	}

	public void deleteEdge(ArrayList<edge> modifyE) {
		for (edge e : modifyE) {
			if (getEdge(e.getSecond(), e.getFirst()) != null) {
				getEdge(e.getSecond(), e.getFirst()).d = false;
			}
			edge_list.remove(e);

		}

	}

	public void dijkstra(node start, node end) {

		node[] pred = new node[node_list.size()];

		distance[] d = new distance[node_list.size()];
		for (int i = 0; i < d.length; ++i) {
			if (i == node_list.indexOf(start)) {
				d[i] = new distance(start, 0);
			} else
				d[i] = new distance(node_list.get(i), Integer.MAX_VALUE);
		}

		ArrayList<distance> pq = new ArrayList<>();

		pq.add(d[index(start)]);

		while (!pq.isEmpty()) {

			distance current = delMin(pq);

			for (edge e : edge_list) {

				if (e.getFirst() == current.n) {

					int newDist = e.getWeight() + d[index(e.getFirst())].distance;
					if (newDist < d[index(e.getSecond())].distance) {

						pred[index(e.getSecond())] = e.getFirst();

						if (d[index(e.getSecond())].distance == Integer.MAX_VALUE)
							pq.add(new distance(e.getSecond(), newDist));
						else {
							decreaseKey(pq, e.getSecond(), newDist);
						}
						d[index(e.getSecond())].distance = newDist;

					}
				}

			}

		}

		get_pred(start, end, pred);
		Thread t = new Thread(new Runnable() {
			boolean first = true;

			class canvas extends Canvas {
				int x = 10, y = 50;
				ArrayList<node> n = new ArrayList<>();
				ArrayList<edge> e = new ArrayList<>();

				public canvas() {
					init();
				}

				public void init() {
					for (int i = sp.size() - 1; i > -1; --i) {

						node temp = new node(sp.get(i).getNumber());
						n.add(temp);
						temp.x = this.x;
						temp.y = this.y;
						x += 90;

					}

					for (int i = 0; i < n.size() - 1; ++i) {
						edge temp = new edge(n.get(i), n.get(i + 1));

						temp.setWeight(getEdge(n.get(i), n.get(i + 1)).getWeight());

						e.add(temp);
					}

				}

				public void paint(Graphics g) {
					this.setBackground(new Color(27, 27, 27));
					Graphics2D gg = (Graphics2D) g;
					gg.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);

					for (edge ee : e)
						ee.draw(gg);
					for (node nn : n) {
						nn.draw(gg);
					}

					gg.setFont(new Font("Arial", Font.BOLD, 12));

					gg.setColor(new Color(255, 192, 25));
					if (d[node_list.indexOf(end)].distance == Integer.MAX_VALUE)
						gg.drawString("There is no path from " + start.getNumber() + " to " + end.getNumber(), 10, 150);
					else
						gg.drawString("Weight of the shortest path from " + start.getNumber() + " to " + end.getNumber()
								+ " : " + d[node_list.indexOf(end)].distance, 10, 150);

				}
			}

			@Override
			public void run() {
				JFrame f = new JFrame("Shortest path from " + start.getNumber() + "to " + end.getNumber());
				canvas c = new canvas();
				if (start.getNumber() == end.getNumber())
					f.setSize(260, 200);
				else if (c.x == 10) {
					f.setSize(200, 200);
				} else
					f.setSize(c.x + 90, 200);

				f.add(c);
				f.setResizable(false);

				f.setVisible(true);

			}

		});
		t.start();

	}

	public void get_pred(node start, node end, node[] pred) {
		sp.removeAll(sp);
		node current = end;
		if (pred[node_list.indexOf(current)] == null) {
			return;
		}
		do {
			sp.add(pred[node_list.indexOf(current)]);
			current = pred[node_list.indexOf(current)];

		} while (current != start);
		sp.add(0, end);

	}

	public void decreaseKey(ArrayList<distance> pq, node n, int newDist) {
		for (distance d : pq) {
			if (d.n == n)
				d.distance = newDist;
		}

	}

	public distance delMin(ArrayList<distance> list) {
		if (list.size() == 0)
			return null;
		int min = list.get(0).distance;
		distance d = list.get(0);
		for (int i = 0; i < list.size(); ++i) {
			if (min > list.get(i).distance) {
				min = list.get(i).distance;
				d = list.get(i);
			}

		}
		list.remove(d);

		return d;
	}

	public int index(node n) {
		return node_list.indexOf(n);
	}

	private class distance {
		public distance(node nn, int d) {
			n = nn;
			distance = d;
		}

		node n;
		int distance;
	}

	@Override
	public void run() {

	}

}
