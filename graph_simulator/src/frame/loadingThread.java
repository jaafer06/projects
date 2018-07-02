package frame;

import java.awt.Color;
import java.awt.Graphics;

import javax.swing.JComponent;

public class loadingThread extends Thread implements Runnable {

	Graphics g;

	public loadingThread(Graphics g) {

		this.g = g;

	}

	public void run() {
		g.setColor(Color.white);
		while (true) {
			try {
				this.sleep(60);
			} catch (InterruptedException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			g.setColor(Color.yellow);
			g.drawString("loadin ...", 10, 70);

		}

	}

}
