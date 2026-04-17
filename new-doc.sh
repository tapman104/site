#!/bin/bash

PROJECT=$1
PAGE=$2

if [ -z "$PROJECT" ]; then
  echo "Usage: ./new-doc.sh <project-slug> [page-slug]"
  exit 1
fi

if [ -z "$PAGE" ]; then
  PAGE="introduction"
fi

# Remove .md extension if user accidentally included it
PAGE="${PAGE%.md}"

# Create directory if it doesn't exist
mkdir -p "_docs/$PROJECT"

FILE="_docs/$PROJECT/$PAGE.md"

if [ -f "$FILE" ]; then
  echo "⚠️  $FILE already exists"
  exit 1
fi

# Calculate order based on existing files
COUNT=$(ls "_docs/$PROJECT"/*.md 2>/dev/null | wc -l)
ORDER=$((COUNT + 1))

# Generate readable title from slug
TITLE=$(echo "$PAGE" | sed 's/[-_]/ /g' | awk '{for(i=1;i<=NF;i++) $i=toupper(substr($i,1,1)) substr($i,2)} 1')

cat > "$FILE" << EOF
---
title: $TITLE
doc: $PROJECT
order: $ORDER
---

# $TITLE

Write your content here.
EOF

echo "✅ Created $FILE (order: $ORDER)"
