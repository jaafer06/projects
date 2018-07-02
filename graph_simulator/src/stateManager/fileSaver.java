package stateManager;

import java.awt.Color;
import java.awt.GridBagConstraints;
import java.awt.GridBagLayout;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Properties;

import javax.swing.JFileChooser;
import javax.swing.JFrame;
import javax.swing.JPanel;
import javax.swing.UIManager;
import javax.swing.UnsupportedLookAndFeelException;
import javax.swing.filechooser.FileNameExtensionFilter;

import graphicalAssets.edge;
import graphicalAssets.node;

public class fileSaver {

	public static void saveFile(JFrame f, ArrayList<node> node_list, ArrayList<edge> edge_list) {

		Properties p = new Properties();

		try {
			UIManager.setLookAndFeel(UIManager.getSystemLookAndFeelClassName());
		} catch (ClassNotFoundException | InstantiationException | IllegalAccessException
				| UnsupportedLookAndFeelException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return;
		}

		JFileChooser chooser = new JFileChooser();

		FileNameExtensionFilter filter = new FileNameExtensionFilter("Graph thoery file", "gt");
		chooser.setFileFilter(filter);

		chooser.showSaveDialog(f);

		File file = chooser.getSelectedFile();
		if (file == null)
			return;
		String fileName = file.toString();

		if (!file.toString().endsWith(".gt")) {
			File ff = new File(file.toString() + ".gt");
			file = ff;
		}
		FileOutputStream output;
		try {
			output = new FileOutputStream(file);
			p.setProperty("nodeCounter", "" + node_list.size());
			for (int i = 0; i < node_list.size(); ++i) {
				p.setProperty("node" + i + "v", "" + node_list.get(i).getNumber());
				p.setProperty("node" + i + "x", "" + node_list.get(i).getX());
				p.setProperty("node" + i + "y", "" + node_list.get(i).getY());

			}

			p.setProperty("edgeCounter", "" + edge_list.size());

			for (int i = 0; i < edge_list.size(); ++i) {
				p.setProperty("edge" + i + "f", edge_list.get(i).getFirstC().getNumber() + "");
				p.setProperty("edge" + i + "s", edge_list.get(i).getSecondC().getNumber() + "");
				p.setProperty("edge" + i + "direction", edge_list.get(i).direction + "");
				p.setProperty("edge" + i + "double", edge_list.get(i).d + "");
				p.setProperty("edge" + i + "w", edge_list.get(i).getWeight() + "");

			}

			p.store(output, "");

		} catch (IOException e) {
			// TODO Auto-generated catch block
			return;
		}

	}

}
