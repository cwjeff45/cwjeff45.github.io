import tkinter as tk
from PIL import Image, ImageTk
import datetime
import os

# Time config
START_TIME = datetime.time(8, 0)   # 8:00 AM
END_TIME = datetime.time(17, 0)    # 5:00 PM

# Load plane image
PLANE_IMAGE_PATH = os.path.join(os.path.dirname(__file__), "f16.png")

# Get screen dimensions
root = tk.Tk()
screen_width = root.winfo_screenwidth()
screen_height = root.winfo_screenheight()
root.destroy()

# Position just above the taskbar (approx 60px from bottom)
y_pos = screen_height - 80

def get_plane_x_position():
    now = datetime.datetime.now().time()
    total_seconds = (datetime.datetime.combine(datetime.date.today(), END_TIME) -
                     datetime.datetime.combine(datetime.date.today(), START_TIME)).total_seconds()
    current_seconds = (datetime.datetime.combine(datetime.date.today(), now) -
                       datetime.datetime.combine(datetime.date.today(), START_TIME)).total_seconds()

    if now < START_TIME:
        return 0
    elif now > END_TIME:
        return screen_width
    else:
        return int((current_seconds / total_seconds) * screen_width)

def update_plane_position():
    x = get_plane_x_position()
    canvas.coords(plane_id, x, 0)
    root.after(60000, update_plane_position)  # Update every 60 seconds

# Create transparent window
root = tk.Tk()
root.overrideredirect(True)
root.geometry(f"{screen_width}x60+0+{y_pos}")
root.wm_attributes("-topmost", True)
root.wm_attributes("-transparentcolor", "#FF00FF")

# Load and place image
canvas = tk.Canvas(root, width=screen_width, height=60, bg="#FF00FF", highlightthickness=0)
canvas.pack()

plane_img = Image.open(PLANE_IMAGE_PATH)
plane_img = plane_img.resize((80, 40), Image.Resampling.LANCZOS)
plane_tk = ImageTk.PhotoImage(plane_img)
plane_id = canvas.create_image(get_plane_x_position(), 0, anchor="nw", image=plane_tk)

update_plane_position()
root.mainloop()

