"facilities": {
    "type": "array",
    "title": "Residential Facilities",
    "items": {
        "type": "string",
        "enum": [
            "apartment",
            "penthouse",
            "terrace-flat",
            "bungalow",
            "villa",
            "condominium",
            "cottage",
            "row-house",
            "duplex-house",
            "triplex-house",
            "farm-house",
            "stilt-house",
            "tree-house",
            "hut",
            "eco-friendly-house",
            "residential-plot"
        ],
        "enumNames": [
            "Apartment(Flat)",
            "Penthouse",
            "Terrace Flat",
            "Bungalow",
            "Villa",
            "Condominium",
            "Cottage",
            "Row House",
            "Duplex House",
            "Triplex House",
            "Farm House",
            "Stilt House",
            "Tree House",
            "Hut",
            "Eco Friendly House",
            "Residential Plot"
        ]
    },
    "uniqueItems": true
},



{
    "if": {
        "properties": {
            "facilities": {
                "contains": {
                    "const": "penthouse"
                }
            }
        }
    },
    "then": {
        "properties": {
            "constructionPropertyLowerFloorCarpet": {
                "title": "Lower Floor Carpet",
                "type": "number",
                "minimum": 1,
                                    "default": 0
            },
            "constructionPropertyUpperFloorCarpet": {
                "title": "Upper Floor Carpet",
                "type": "number",
                "minimum": 1,
                                    "default": 0
            }
        }
    }
},