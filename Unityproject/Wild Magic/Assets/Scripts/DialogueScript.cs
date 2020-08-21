using System;
using System.Collections;
using System.Collections.Generic;
using TMPro;
using UnityEngine;
using UnityEngine.UI;

public class DialogueScript : MonoBehaviour
{
    public Sprite Reiker;
    public Sprite Dummy;

    public GameObject Textbox;
    public GameObject ImageReference;
    public GameObject CharName;
    public GameObject HeadUI;
    private int Lineread;
    private string[] lines;
    private bool TextBool;
    int LastComma;
    // Start is called before the first frame update
    void Start()
    {
        Lineread = 0;
    }
    public void StartDialogue() 
    {
        MoveScript.MoveAuthorization = false;
        lines = System.IO.File.ReadAllLines(@"Assets\Scripts\Dialogue.txt");
        Lineread = 0;
        TextBool = true;
        HeadUI.SetActive(true);
        DialogueLine();
    }
    void DialogueLine() 
    {
        if (Lineread==lines.Length)
        {
            HeadUI.SetActive(false);
            MoveScript.MoveAuthorization = true;
            return;
        }
        else
        {   
            if (lines[Lineread][0].Equals("["))
            {
                Debug.Log("Capitaine Crochet!");
                return;
            }
            else
            {
                TextMeshProUGUI CharText = CharName.GetComponent<TextMeshProUGUI>();
                Text DialogueBoxText = Textbox.GetComponent<Text>();
                String Parenthesis=lines[Lineread].Substring(1,lines[Lineread].IndexOf(")",0)-1);
                LastComma=Parenthesis.IndexOf(",",0);
                int R = Int32.Parse(Parenthesis.Substring(0,LastComma));
                Parenthesis = Parenthesis.Substring(LastComma+1);
                LastComma= Parenthesis.IndexOf(",",0);
                int G = Int32.Parse(Parenthesis.Substring(0,LastComma));
                Parenthesis = Parenthesis.Substring(LastComma+1);
                LastComma=Parenthesis.IndexOf(",",0);
                int B = Int32.Parse(Parenthesis.Substring(0,LastComma));
                Parenthesis = Parenthesis.Substring(LastComma+1);
                LastComma=Parenthesis.IndexOf(",",0);
                string StFilename = Parenthesis.Substring(0,LastComma);
                Parenthesis = Parenthesis.Substring(LastComma+1);
                LastComma=Parenthesis.IndexOf(",",0);
                string StCharName = Parenthesis.Substring(0,LastComma);
                string StTextVars = Parenthesis.Substring(LastComma+1);
                CharText.color=new Color(R/255f,G/255f,B/255f);
                CharText.SetText(StCharName);
                DialogueBoxText.text = lines[Lineread].Substring(lines[Lineread].IndexOf(")")+1);
                if (StTextVars.Contains("i"))
                {
                    if (StTextVars.Contains("b"))
                    {
                        DialogueBoxText.fontStyle = FontStyle.BoldAndItalic;
                    }
                    else
                    {
                        DialogueBoxText.fontStyle = FontStyle.Italic;
                    }
                }
                else {
                    if (StTextVars.Contains("b"))
                    {
                        DialogueBoxText.fontStyle = FontStyle.Bold;
                    }
                    else { DialogueBoxText.fontStyle = FontStyle.Normal; }
                }
                Image CharImage = ImageReference.GetComponent<Image>();
                switch (StFilename)
                {
                    case "Reiker":
                        CharImage.sprite = Reiker;
                        break;
                    case "Dummy":
                        CharImage.sprite = Dummy;
                        break;
                    default:
                        break;
                }
                
            }
        }
    }
    // Update is called once per frame
    void Update()
    {
        if (Input.GetKeyUp(KeyCode.A) && TextBool) 
        {
            Lineread++;
            DialogueLine();
        }
    }
}