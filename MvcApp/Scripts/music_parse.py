import id3reader
import os
import json
import re

music_data = []
def getTags(path):
    try:
        id3r = id3reader.Reader(path)
        
        song_info = {}
        song_info['Title'] = id3r.getValue('title')
        song_info['Artist'] = id3r.getValue('performer')
        song_info['Album'] = id3r.getValue('album')
        year = id3r.getValue('year')
        y = re.match(r'(?<!\d)\d{4,7}(?!\d)', year)
        song_info['ReleaseYear'] = y.group(0)
        song_info['Genre'] = id3r.getValue('genre')
        song_info['Filename'] = path.split('/')[-1]
        song_info['Folder'] = path.split('/')[-2]
        
        if song_info['Title']:
            music_data.append(song_info)
    except:
        pass
        
path = 'C:/Users/Dylan/Music/'
[getTags(path+file) for file in os.listdir(path) if os.path.isfile(path+file)]
[getTags(path+directory+'/'+file) for directory in os.listdir(path) if os.path.isdir(path+directory) for file in os.listdir(path+directory)]

with open('music.json', 'w') as fp:
    json.dump(music_data, fp)
