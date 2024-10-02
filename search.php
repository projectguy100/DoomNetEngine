<?php
// search.php

// Function to get a snippet of text around the search term
function getSnippet($content, $term, $snippetLength = 100) {
    $pos = stripos($content, $term);
    if ($pos === false) return "";
    
    $start = max(0, $pos - $snippetLength / 2);
    $snippet = substr($content, $start, $snippetLength);
    
    // Ensure we don't cut words in half
    $snippet = preg_replace('/^\S+\s|\s\S+$/', '', $snippet);
    
    return "..." . $snippet . "...";
}

// Check if a search query was submitted
if (isset($_GET['query']) && !empty($_GET['query'])) {
    $searchQuery = $_GET['query'];
    $results = [];

    // Directory containing the HTML files
    $directory = 'Sites/';

    // Get all HTML files in the directory
    $files = glob($directory . '*.html');

    foreach ($files as $file) {
        $content = file_get_contents($file);
        
        // Remove HTML tags for searching
        $plainContent = strip_tags($content);
        
        // Check if the search term is in the content
        if (stripos($plainContent, $searchQuery) !== false) {
            $snippet = getSnippet($plainContent, $searchQuery);
            $results[] = [
                'file' => basename($file),
                'snippet' => $snippet
            ];
        }
    }

    // Output the results
    echo "<h1>Search Results for '{$searchQuery}'</h1>";
    
    if (empty($results)) {
        echo "<p>No results found.</p>";
    } else {
        echo "<ul>";
        foreach ($results as $result) {
            echo "<li>";
            echo "<h3><a href='{$directory}{$result['file']}'>{$result['file']}</a></h3>";
            echo "<p>{$result['snippet']}</p>";
            echo "</li>";
        }
        echo "</ul>";
    }
} else {
    echo "<p>Please enter a search query.</p>";
}
?>
