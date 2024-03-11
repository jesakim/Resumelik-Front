#!/bin/bash

# Navigate to the directory containing the files
cd ../store/models

# Loop through each file in the directory
for file in *; do
    # Check if the file exists and is not already lowercase
    if [ -f "$file" ] && [ "$file" != "${file,,}" ]; then
        # Rename the file to lowercase
        mv -i "$file" "${file,,}"
        echo "Renamed '$file' to '${file,,}'"
    fi
done

echo "All files renamed to lowercase."
