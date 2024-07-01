import os
import json
import http
import flask
import re

brackets_dir = os.path.join(os.path.dirname(__file__), 'fixtures')

def _open_config(filename):

    with open(filename) as config_file:
        json_contents = json.load(config_file)
        config_file.close()

    return json_contents

def get_avalable_years():
    try:
        available_years = [extract_year(f.title()) for f in os.listdir(brackets_dir)]
        available_years.sort()
        
        return available_years
    except FileNotFoundError:
        flask.abort(http.HTTPStatus.NOT_FOUND)

def extract_year(title: str):
    matched = re.search("--(\d+).json$", title, re.IGNORECASE).group(1)

    return int(matched)

def get_tax_brackets(tax_year='2022'):
    filename = f'tax-brackets--{tax_year}.json'
    file_with_path = os.path.join(brackets_dir, filename)
    try:
        return _open_config(file_with_path)
    except FileNotFoundError:
        flask.abort(http.HTTPStatus.NOT_FOUND)
