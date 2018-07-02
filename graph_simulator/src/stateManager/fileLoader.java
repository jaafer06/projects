package stateManager;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Properties;

import javax.swing.JFileChooser;
import javax.swing.JFrame;
import javax.swing.UIManager;
import javax.swing.filechooser.FileNameExtensionFilter;

import graphicalAssets.*;
import sun.tools.jar.Main;

public class fileLoader {

	public static result getData(JFrame f, boolean test) {
		result r = new result();
		InputStream fileInput;
		int nc = 0, ec = 0;
		try {

			JFileChooser chooser = new JFileChooser();

			FileNameExtensionFilter filter = new FileNameExtensionFilter("Graph thoery file", "gt");
			chooser.setFileFilter(filter);

			Properties p = new Properties();

			if (!test) {
				chooser.showOpenDialog(f);
				File file = chooser.getSelectedFile();
				fileInput = new FileInputStream(file);

				p.load(fileInput);
			} else {

				fileInput = Main.class.getResourceAsStream("/test/test.gt");
				p.load(fileInput);

			}

			nc = Integer.parseInt(p.getProperty("nodeCounter"));
			ec = Integer.parseInt(p.getProperty("edgeCounter"));
			for (int i = 0; i < nc; ++i) {
				int v = Integer.parseInt(p.getProperty("node" + i + "v"));
				int x = Integer.parseInt(p.getProperty("node" + i + "x"));
				int y = Integer.parseInt(p.getProperty("node" + i + "y"));

				node n = new node(v);
				n.x = x;
				n.y = y;
				n.refreshBound();

				r.n.add(n);

			}
			for (int i = 0; i < ec; ++i) {
				int fnv = Integer.parseInt(p.getProperty("edge" + i + "f"));
				int snv = Integer.parseInt(p.getProperty("edge" + i + "s"));
				int w = Integer.parseInt(p.getProperty("edge" + i + "w"));

				boolean direction = true;
				if (p.getProperty("edge" + i + "direction").equals("false"))
					direction = false;
				boolean d = false;
				if (p.getProperty("edge" + i + "double").equals("true"))
					d = true;

				edge e = new edge(getNode(fnv, r.n), getNode(snv, r.n));
				e.direction = direction;
				e.d = d;
				e.setWeight(w);
				r.e.add(e);

			}

			fileInput.close();

		} catch (Exception e) {
			return null;
		}

		return r;
	}

	public static node getNode(int n, ArrayList<node> node_list) {
		for (node node : node_list)
			if (node.getNumber() == n)
				return node;
		return null;

	}

}
