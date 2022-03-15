#!/bin/bash

if test $# -lt 1; then
	echo "    Please Provide ./Menu.sh lab3_sample.txt"
	exit
elif test ! -f $1; then
	echo "    ERROR: $1 does not exist."
	exit
fi

input=""
echo "Welcome to the Menu program..."

while true; do
	echo "    1. find_words()"
	echo "    2. add_text()"
    echo "    3. delete_word()"
	echo "    4. replace_first_occurance()"
	echo "    5. copy_file()"
    echo "    6. exit()"
	read -p "> " userInput
# find_words() - This function will search for all instances of the words: Linux, functions, Bash,runs within the lab3_sample.txt (using sed or awk or grep). Use echo to display the lines from the file where the words are found.
# add_text() - This function will prompt the user to enter a sentence and then the script should append the sentence to the end of the original text file lab3_sample.txt. Do not create a new text file during this process. The aforementioned sentence should be appended to the original lab3_sample.txt file.
# delete_word() - This function will prompt the user to enter a word and then the script should delete all occurrences of this word in the text file lab3_sample.txt.
# replace_first_occurrence() - This function will prompt the user to enter two words - old_word and new_word. The first occurrence of old_word in lab3_sample.txt should be replaced by the new_word.
# copy_file() - This function should create a new folder named solution within the same directory as the Menu.sh script. Next, this function should use the cp command and copy the original text file (lab3_sample.txt) to the solution directory.
# exit_program() - This function should exit the program.
	case "$userInput" in
        [1] | find_words)
            echo ""
			echo "This is the find_words command it will find all occurance of the words: Linux, functions, Bash, and runs"
            echo "This function will display the lines from the file where these words are found"
            echo "Linux appears on Lines:"
            grep -n "Linux" lab3_sample.txt | cut -d: -f1
            echo "functions appears on Lines:"
            grep -n "functions" lab3_sample.txt | cut -d: -f1
            echo "Bash appears on Lines:"
            grep -n "Bash" lab3_sample.txt | cut -d: -f1
            echo "runs appears on Lines:"
            grep -n "runs" lab3_sample.txt | cut -d: -f1
			;;
        [2] | add_text)
			echo ""
			echo "This command will append your input to $1."
			echo "Enter a sentence:"
			read -p "> " input
			if echo "$input" >> $1; then
				echo "Successfully appended $1."
			else
				echo "ERROR: could not append $1."
			fi
			;;
        [3] | delete_word)
			echo ""
			echo "This command will remove your input from $1."
			echo "Enter a word:"
			read -p "> " input
			sed "s/\<$input\>//g" lab3_sample.txt 
			;;
        [4] | replace_first_occurance)
			echo ""
			echo "This command will remove your input and replace from $1."
			echo "Enter a word to replace:"
			read -p "> " input1
			echo "What would you like to replace it with:"
			read -p "> " input2
			#sed -i "0,/$input1:/{s/$input1:.*/$input1: ${$input2}/}" ./lab3_sample.txt
			sed "0,/$input1/{s/$input1/$input2/}" lab3_sample.txt
			;;
		[5] | copy_file)
			if test -f "solution"; then mkdir solution; fi
			if cp $1 ./solution/$1; then
				echo "Successfully copied $1 into solution directory."
			else
				echo "ERROR: could not copy $1 into solution directory."
			fi
			;;
		[6] | exit)
			echo "Exiting Menu"
			echo ""
			exit
			;;
		*)
		echo "Invalid command."
		;;
	esac
	echo "" && echo ""
done