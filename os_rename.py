#!/usr/bin/python3 

import os
import re

CURRENT_WD = os.getcwd()

reg = re.compile(u"[^a-zA-Z0-9\u0400-\u0500]")

for root, dirs, files in os.walk(CURRENT_WD, topdown=False):
    for filete in files:
        filename, ext = os.path.splitext(filete)
        filename = re.sub(reg, '_', filename)
        filename = re.sub(r'(_)\1+', r'\1', filename)
        os.rename(os.path.join(root,filete), os.path.join(root,filename.lower()+ext.lower())) 
    for folder in dirs:
        foldername = folder
        foldername = re.sub(reg, '_', folder)
        foldername = re.sub(r'(_)\1+', r'\1', foldername)
        foldername = re.sub(r'[_]$', '', foldername)
        os.rename(os.path.join(root, folder), os.path.join(root, foldername.lower()));
     
