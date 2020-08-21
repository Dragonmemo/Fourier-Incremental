using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using System.Linq;
using System;
using UnityEngine.UI;

public class SpellMaker : MonoBehaviour
{
    public GameObject Bouton1;
    public GameObject Bouton2;
    public GameObject Bouton3;
    public GameObject Bouton4;
    public static GameObject BT1;
    public static GameObject BT2;
    public static GameObject BT3;
    public static GameObject BT4;
    public GameObject Texte;
    public GameObject Panel;
    public GameObject RightSong;
    public GameObject WrongSong;
    private AudioSource Playersound;
    private Image ALPHA;
    private static int CurrentPartID = 0;
    private static int[] CharUnlocks= {0,0,0,0,0}; 
    private static bool[] Bools = { false, false, false, false };
    private List<bool> lBools= new List<bool>();
    private List<int[]>[] Tries;
    private static Button interactor;
    private static RectTransform POS;
    private int INTELLIGENT;
    private bool MoveAuthorization = true;

    public GameObject WhirlwindSpellB;
    // Start is called before the first frame update
    void Start()
    {
        BT1 = Bouton1;
        BT2 = Bouton2;
        BT3 = Bouton3;
        BT4 = Bouton4;
        Bools[0] = false;
        Bools[1] = false;
        Bools[2] = false;
        Bools[3] = false;
        Tries = new List<int[]>[5];
        Tries[0] = new List<int[]>();
        Tries[1] = new List<int[]>();
        Tries[2] = new List<int[]>();
        Tries[3] = new List<int[]>();
        Tries[4] = new List<int[]>();
        SkillUpdater();
        Debug.Log("Initialized!");
    }

    public void AddSpellPartChar()
    {
        if (CharUnlocks[CharChange.CurrentCharId]<4)
        {
            CharUnlocks[CharChange.CurrentCharId]++;
        }
        SkillUpdater();
    }
    public void Call1()
    {
        OnClickFuse(Bouton1);
    }
    public void Call2()
    {
        OnClickFuse(Bouton2);
    }
    public void Call3()
    {
        OnClickFuse(Bouton3);
    }
    public void Call4()
    {
        OnClickFuse(Bouton4);
    }
    private void OnClickFuse(GameObject Bouton) 
    {
        lBools.AddRange(Bools);
        if (lBools.Contains(true)) 
        {
            switch (Bouton.name)
            {
                case "SkillPart1":
                    if (Bools[1])
                    {
                        Validation(new int[] { 0, 1 });
                    }
                    if (Bools[2])
                    {
                        Validation(new int[] { 0, 2 });
                    }
                    if (Bools[3])
                    {
                        Validation(new int[] { 0, 3 });
                    }
                    break;
                case "SkillPart2":
                    if (Bools[0])
                    {
                        Validation(new int[] { 0, 1 });
                    }
                    if (Bools[2])
                    {
                        Validation(new int[] { 1, 2 });
                    }
                    if (Bools[3])
                    {
                        Validation(new int[] { 1, 3 });
                    }
                    break;
                case "SkillPart3":
                    if (Bools[0])
                    {
                        Validation(new int[] { 0, 2 });
                    }
                    if (Bools[1])
                    {
                        Validation(new int[] { 1, 2 });
                    }
                    if (Bools[3])
                    {
                        Validation(new int[] { 2, 3 });
                    }
                    break;
                case "SkillPart4":
                    if (Bools[0])
                    {
                        Validation(new int[] { 0, 3 });
                    }
                    if (Bools[1])
                    {
                        Validation(new int[] { 1, 3 });
                    }
                    if (Bools[2])
                    {
                        Validation(new int[] { 2, 3 });
                    }
                    break;
            }
            if (Tries[CharChange.CurrentCharId].Any(p => p.SequenceEqual(new int[] {0,1})) && Tries[CharChange.CurrentCharId].Any(p => p.SequenceEqual(new int[] { 0, 2 })) && Tries[CharChange.CurrentCharId].Any(p => p.SequenceEqual(new int[] { 0, 3 })))
            {
                interactor = Bouton1.GetComponent<Button>();
                interactor.interactable = false;
            }
            else
            {
                interactor = Bouton1.GetComponent<Button>();
                interactor.interactable = true;
            }
            if (Tries[CharChange.CurrentCharId].Any(p => p.SequenceEqual(new int[] { 0, 1 })) && Tries[CharChange.CurrentCharId].Any(p => p.SequenceEqual(new int[] { 1, 2 })) && Tries[CharChange.CurrentCharId].Any(p => p.SequenceEqual(new int[] { 1, 3 })))
            {
                interactor = Bouton2.GetComponent<Button>();
                interactor.interactable = false;
            }
            else
            {
                interactor = Bouton2.GetComponent<Button>();
                interactor.interactable = true;
            }
            if (Tries[CharChange.CurrentCharId].Any(p => p.SequenceEqual(new int[] { 1, 2 })) && Tries[CharChange.CurrentCharId].Any(p => p.SequenceEqual(new int[] { 0, 2 })) && Tries[CharChange.CurrentCharId].Any(p => p.SequenceEqual(new int[] { 2, 3 })))
            {
                interactor = Bouton3.GetComponent<Button>();
                interactor.interactable = false;
            }
            else
            {
                interactor = Bouton3.GetComponent<Button>();
                interactor.interactable = true;
            }
            if (Tries[CharChange.CurrentCharId].Any(p => p.SequenceEqual(new int[] { 1, 3 })) && Tries[CharChange.CurrentCharId].Any(p => p.SequenceEqual(new int[] { 2, 3 })) && Tries[CharChange.CurrentCharId].Any(p => p.SequenceEqual(new int[] { 0, 3 })))
            {
                interactor = Bouton4.GetComponent<Button>();
                interactor.interactable = false;
            }
            else
            {
                interactor = Bouton4.GetComponent<Button>();
                interactor.interactable = true;
            }
            Bools[0] = false;
            Bools[1] = false;
            Bools[2] = false;
            Bools[3] = false;
        }
        else
        {
            switch (Bouton.name)
            {
                case "SkillPart1":
                    Bools[0] = true;
                    if (Tries[CharChange.CurrentCharId].Any(p=>p.SequenceEqual(new int[] { 0, 3 })))
                    {
                        interactor = Bouton4.GetComponent<Button>();
                        interactor.interactable = false;
                    }
                    if (Tries[CharChange.CurrentCharId].Any(p => p.SequenceEqual(new int[] { 0, 2 })))
                    {
                        interactor = Bouton3.GetComponent<Button>();
                        interactor.interactable = false;
                    }
                    if (Tries[CharChange.CurrentCharId].Any(p => p.SequenceEqual(new int[] { 0, 1 })))
                    {
                        interactor = Bouton2.GetComponent<Button>();
                        interactor.interactable = false;
                    }
                    break;
                case "SkillPart2":
                    Bools[1] = true;
                    if (Tries[CharChange.CurrentCharId].Any(p => p.SequenceEqual(new int[] { 1, 3 })))
                    {
                        interactor = Bouton4.GetComponent<Button>();
                        interactor.interactable = false;
                    }
                    if (Tries[CharChange.CurrentCharId].Any(p => p.SequenceEqual(new int[] { 1, 2 })))
                    {
                        interactor = Bouton3.GetComponent<Button>();
                        interactor.interactable = false;
                    }
                    if (Tries[CharChange.CurrentCharId].Any(p => p.SequenceEqual(new int[] { 0, 1 })))
                    {
                        interactor = Bouton1.GetComponent<Button>();
                        interactor.interactable = false;
                    }
                    break;
                case "SkillPart3":
                    Bools[2] = true;
                    if (Tries[CharChange.CurrentCharId].Any(p => p.SequenceEqual(new int[] { 2, 3 })))
                    {
                        interactor = Bouton4.GetComponent<Button>();
                        interactor.interactable = false;
                    }
                    if (Tries[CharChange.CurrentCharId].Any(p => p.SequenceEqual(new int[] { 1, 2 })))
                    {
                        interactor = Bouton2.GetComponent<Button>();
                        interactor.interactable = false;
                    }
                    if (Tries[CharChange.CurrentCharId].Any(p => p.SequenceEqual(new int[] { 0, 2 })))
                    {
                        interactor = Bouton1.GetComponent<Button>();
                        interactor.interactable = false;
                    }
                    break;
                case "SkillPart4":
                    Bools[3] = true;
                    if (Tries[CharChange.CurrentCharId].Any(p => p.SequenceEqual(new int[] { 0, 3 })))
                    {
                        interactor = Bouton1.GetComponent<Button>();
                        interactor.interactable = false;
                    }
                    if (Tries[CharChange.CurrentCharId].Any(p => p.SequenceEqual(new int[] { 1, 3 })))
                    {
                        interactor = Bouton2.GetComponent<Button>();
                        interactor.interactable = false;
                    }
                    if (Tries[CharChange.CurrentCharId].Any(p => p.SequenceEqual(new int[] { 2, 3 })))
                    {
                        interactor = Bouton3.GetComponent<Button>();
                        interactor.interactable = false;
                    }
                    break;
                default:
                    Debug.Log(Bouton.name);
                    break;
            }
            interactor = Bouton.GetComponent<Button>();
            interactor.interactable = false;
            
        }
        lBools = new List<bool>();
    }
    private void Validation(int[] Checkable) 
    {
        Tries[CharChange.CurrentCharId].Add(Checkable);
        int identifier =Checkable[0]*4+Checkable[1];
        switch (identifier)
        {
            case 1:
                Playersound = RightSong.GetComponent<AudioSource>();
                Playersound.enabled = !Playersound.enabled;
                Playersound.enabled = !Playersound.enabled;
                StartCoroutine(Popuper("Testage"));
                StartCoroutine(TimeBeforeCast());
                break;
            default:
                Playersound = WrongSong.GetComponent<AudioSource>();
                Playersound.enabled = !Playersound.enabled;
                Playersound.enabled = !Playersound.enabled;
                StartCoroutine(Popuper("You made a new... spell?"));
                Debug.Log(identifier);
                break;
        }
    }
    private IEnumerator Popuper(string Message)
    {
        ALPHA = Panel.GetComponent<Image>();
        Texte.GetComponent<Text>().text= Message;
        // loop over 1 second forward
        for (float i = 0; i <= 1; i += Time.deltaTime /2.2f)
        {
            // set color with i as alpha
            if (i<=1/11)
            {
                ALPHA.color = new Color(1, 1, 1, i * 2.2f);
                Texte.GetComponent<Text>().color= new Color(0, 0, 0, i * 2.2f);
                yield return null;
            }
            else
            {
                ALPHA.color = new Color(1, 1, 1, 1-(i-1/11)*11/10);
                Texte.GetComponent<Text>().color = new Color(0, 0, 0, 1 - (i - 1 / 11) * 11 / 10);
                yield return null;
            }
            
        }
    }
    private IEnumerator TimeBeforeCast() 
    {
        for (float i = 0; i <= 0.5; i += Time.deltaTime)
        { yield return null; }
        SpellCaster.SpellCastbis();
        WhirlwindSpellB.SetActive(true);
    }
    public static void REsetter()
    {
        Bools[0] = false;
        Bools[1] = false;
        Bools[2] = false;
        Bools[3] = false;
        interactor = BT1.GetComponent<Button>();
        interactor.interactable = true;
        interactor = BT2.GetComponent<Button>();
        interactor.interactable = true;
        interactor = BT3.GetComponent<Button>();
        interactor.interactable = true;
        interactor = BT4.GetComponent<Button>();
        interactor.interactable = true;
    }
    public static void SkillUpdater() 
    {
        switch (CharUnlocks[CharChange.CurrentCharId])
        {
            case 0:
                BT1.SetActive(false);
                BT2.SetActive(false);
                BT3.SetActive(false);
                BT4.SetActive(false);
                CurrentPartID = 0;
                break;
            case 1:
                BT1.SetActive(true);
                BT2.SetActive(false);
                BT3.SetActive(false);
                BT4.SetActive(false);
                POS=BT1.GetComponent<RectTransform>();
                POS.SetPositionAndRotation(new Vector3(398, 289, 0) + new Vector3(Convert.ToSingle(Math.Cos(-Math.PI/2)), Convert.ToSingle(Math.Sin(-Math.PI / 2)), 0) * 150, new Quaternion(0,0,0,0));
                CurrentPartID = 1;
                break;
            case 2:
                BT1.SetActive(true);
                POS = BT1.GetComponent<RectTransform>();
                POS.SetPositionAndRotation(new Vector3(398, 289, 0) + new Vector3(Convert.ToSingle(Math.Cos(Math.PI / 2)), Convert.ToSingle(Math.Sin(Math.PI / 2)), 0) * 150, new Quaternion(0, 0, 0, 0));
                BT2.SetActive(true);
                POS = BT2.GetComponent<RectTransform>();
                POS.SetPositionAndRotation(new Vector3(398, 289, 0) + new Vector3(Convert.ToSingle(Math.Cos(-Math.PI / 2)), Convert.ToSingle(Math.Sin(-Math.PI / 2)), 0) * 150, new Quaternion(0, 0, 0, 0));
                BT3.SetActive(false);
                BT4.SetActive(false);
                CurrentPartID = 2;
                break;
            case 3:
                BT1.SetActive(true);
                POS = BT1.GetComponent<RectTransform>();
                POS.SetPositionAndRotation(new Vector3(398,289,0) + new Vector3(Convert.ToSingle(Math.Cos(4*Math.PI/3-Math.PI / 2)), Convert.ToSingle(Math.Sin(4 * Math.PI/3 - Math.PI / 2)), 0) * 150, new Quaternion(0, 0, 0, 0));
                BT2.SetActive(true);
                POS = BT2.GetComponent<RectTransform>();
                POS.SetPositionAndRotation(new Vector3(398, 289, 0) + new Vector3(Convert.ToSingle(Math.Cos(2*Math.PI/3-Math.PI / 2)), Convert.ToSingle(Math.Sin(2 * Math.PI / 3 - Math.PI / 2)), 0) * 150, new Quaternion(0, 0, 0, 0));
                BT3.SetActive(true);
                POS = BT3.GetComponent<RectTransform>();
                POS.SetPositionAndRotation(new Vector3(398, 289, 0) + new Vector3(Convert.ToSingle(Math.Cos(-Math.PI / 2)), Convert.ToSingle(Math.Sin(-Math.PI / 2)), 0) * 150, new Quaternion(0, 0, 0, 0));
                BT4.SetActive(false);
                CurrentPartID = 3;
                break;
            case 4:
                BT1.SetActive(true);
                POS = BT1.GetComponent<RectTransform>();
                POS.SetPositionAndRotation(new Vector3(398, 289, 0) + new Vector3(Convert.ToSingle(Math.Cos(Math.PI)), Convert.ToSingle(Math.Sin(Math.PI)), 0) * 150, new Quaternion(0, 0, 0, 0));
                BT2.SetActive(true);
                POS = BT2.GetComponent<RectTransform>();
                POS.SetPositionAndRotation(new Vector3(398, 289, 0) + new Vector3(Convert.ToSingle(Math.Cos(Math.PI / 2)), Convert.ToSingle(Math.Sin(Math.PI / 2)), 0) * 150, new Quaternion(0, 0, 0, 0));
                BT3.SetActive(true);
                POS = BT3.GetComponent<RectTransform>();
                POS.SetPositionAndRotation(new Vector3(398, 289, 0) + new Vector3(Convert.ToSingle(Math.Cos(0)), Convert.ToSingle(Math.Sin(0)), 0) * 150, new Quaternion(0, 0, 0, 0));
                BT4.SetActive(true);
                POS = BT4.GetComponent<RectTransform>();
                POS.SetPositionAndRotation(new Vector3(398, 289, 0) + new Vector3(Convert.ToSingle(Math.Cos(-Math.PI / 2)), Convert.ToSingle(Math.Sin(-Math.PI / 2)), 0) * 150, new Quaternion(0, 0, 0, 0));
                CurrentPartID = 4;
                break;
        } 
    }
    private void THOUGHTTURN(float dx)
    {
        if (dx < 0)
        {
            StartCoroutine(TURN(-1));
        }
        if (dx > 0)
        {
            StartCoroutine(TURN(1));
        }

    }
    private IEnumerator TURN(int Xs)
    {
        if (CharUnlocks[CharChange.CurrentCharId] == 0)
        {
            Debug.Log("You can't turn without any spell part!");
        }
        else 
        {
            if (MoveAuthorization)
            {
                MoveAuthorization = false;
                // loop over 1 second forward
                for (float i = 0; i <= 1; i += Time.deltaTime)
                {
                    // move with i as instant speed
                    POS = BT1.GetComponent<RectTransform>();
                    POS.Translate(new Vector3(Convert.ToSingle(Math.Cos(2 * Math.PI * i * Xs / CharUnlocks[CharChange.CurrentCharId] + (CurrentPartID-1) * 2 * Math.PI / CharUnlocks[CharChange.CurrentCharId])), Convert.ToSingle(Math.Sin(2 * Math.PI * i * Xs / CharUnlocks[CharChange.CurrentCharId] + (CurrentPartID-1) * 2 * Math.PI / CharUnlocks[CharChange.CurrentCharId])), 0) * Time.deltaTime * 150 * Xs * Convert.ToSingle(2 * Math.PI / CharUnlocks[CharChange.CurrentCharId]));
                    POS = BT2.GetComponent<RectTransform>();
                    POS.Translate(new Vector3(Convert.ToSingle(Math.Cos(2 * Math.PI * i * Xs / CharUnlocks[CharChange.CurrentCharId] + (CurrentPartID-2) * 2 * Math.PI / CharUnlocks[CharChange.CurrentCharId])), Convert.ToSingle(Math.Sin(2 * Math.PI * i * Xs / CharUnlocks[CharChange.CurrentCharId] + (CurrentPartID-2) * 2 * Math.PI / CharUnlocks[CharChange.CurrentCharId])), 0) * Time.deltaTime * 150 * Xs * Convert.ToSingle(2 * Math.PI / CharUnlocks[CharChange.CurrentCharId]));
                    POS = BT3.GetComponent<RectTransform>();
                    POS.Translate(new Vector3(Convert.ToSingle(Math.Cos(2 * Math.PI * i * Xs / CharUnlocks[CharChange.CurrentCharId] + (CurrentPartID-3) * 2 * Math.PI / CharUnlocks[CharChange.CurrentCharId])), Convert.ToSingle(Math.Sin(2 * Math.PI * i * Xs / CharUnlocks[CharChange.CurrentCharId] + (CurrentPartID-3) * 2 * Math.PI / CharUnlocks[CharChange.CurrentCharId])), 0) * Time.deltaTime * 150 * Xs * Convert.ToSingle(2 * Math.PI / CharUnlocks[CharChange.CurrentCharId]));
                    POS = BT4.GetComponent<RectTransform>();
                    POS.Translate(new Vector3(Convert.ToSingle(Math.Cos(2 * Math.PI * i * Xs / CharUnlocks[CharChange.CurrentCharId] + (CurrentPartID-4) * 2 * Math.PI / CharUnlocks[CharChange.CurrentCharId])), Convert.ToSingle(Math.Sin(2 * Math.PI * i * Xs / CharUnlocks[CharChange.CurrentCharId] + (CurrentPartID-4) * 2 * Math.PI / CharUnlocks[CharChange.CurrentCharId])), 0) * Time.deltaTime * 150 * Xs * Convert.ToSingle(2 * Math.PI / CharUnlocks[CharChange.CurrentCharId]));
                    yield return null;
                }
                CurrentPartID = CurrentPartID % CharUnlocks[CharChange.CurrentCharId] + Xs;
                POS = BT1.GetComponent<RectTransform>();
                POS.SetPositionAndRotation(new Vector3(398, 289, 0) + new Vector3(Convert.ToSingle(Math.Cos(2 * Math.PI * (CurrentPartID-1) / CharUnlocks[CharChange.CurrentCharId] - Math.PI / 2)), Convert.ToSingle(Math.Sin(2 * Math.PI * (CurrentPartID-1) / CharUnlocks[CharChange.CurrentCharId] - Math.PI / 2)), 0) * 150, new Quaternion(0, 0, 0, 0));
                POS = BT2.GetComponent<RectTransform>();
                POS.SetPositionAndRotation(new Vector3(398, 289, 0) + new Vector3(Convert.ToSingle(Math.Cos(2 * Math.PI * (CurrentPartID-2) / CharUnlocks[CharChange.CurrentCharId] - Math.PI / 2)), Convert.ToSingle(Math.Sin(2 * Math.PI * (CurrentPartID-2) / CharUnlocks[CharChange.CurrentCharId] - Math.PI / 2)), 0) * 150, new Quaternion(0, 0, 0, 0));
                POS = BT3.GetComponent<RectTransform>();
                POS.SetPositionAndRotation(new Vector3(398, 289, 0) + new Vector3(Convert.ToSingle(Math.Cos(2 * Math.PI * (CurrentPartID-3) / CharUnlocks[CharChange.CurrentCharId] - Math.PI / 2)), Convert.ToSingle(Math.Sin(2 * Math.PI * (CurrentPartID-3) / CharUnlocks[CharChange.CurrentCharId] - Math.PI / 2)), 0) * 150, new Quaternion(0, 0, 0, 0));
                POS = BT4.GetComponent<RectTransform>();
                POS.SetPositionAndRotation(new Vector3(398, 289, 0) + new Vector3(Convert.ToSingle(Math.Cos(2 * Math.PI * (CurrentPartID-4) / CharUnlocks[CharChange.CurrentCharId] - Math.PI / 2)), Convert.ToSingle(Math.Sin(2 * Math.PI * (CurrentPartID-4) / CharUnlocks[CharChange.CurrentCharId] - Math.PI / 2)), 0) * 150, new Quaternion(0, 0, 0, 0));
                MoveAuthorization = true;
            }
            
        }
    }
    // Update is called once per frame
    void Update()
    {
        if (TabChange.Const==1)
        {
            float horizontalInput = Input.GetAxis("Horizontal");
            //Get the value of the Horizontal input axis.
            THOUGHTTURN(horizontalInput);
            if (Input.GetKeyUp(KeyCode.UpArrow))
            {
                int currentPartID;
                if (CurrentPartID%CharUnlocks[CharChange.CurrentCharId] !=0)
                {
                    currentPartID = (CurrentPartID + CharUnlocks[CharChange.CurrentCharId] * 2) % CharUnlocks[CharChange.CurrentCharId];
                }
                else
                {
                    currentPartID = CharUnlocks[CharChange.CurrentCharId];  
                }
                switch (currentPartID)
                {
                    case 1:
                        if (!Bools[0])
                        {
                            OnClickFuse(Bouton1);
                        }
                        break;
                    case 2:
                        if (!Bools[1])
                        {
                            OnClickFuse(Bouton2);
                        }
                        break;
                    case 3:
                        if (!Bools[2])
                        {
                            OnClickFuse(Bouton3);
                        }
                        break;
                    case 4:
                        if (!Bools[3])
                        {
                            OnClickFuse(Bouton4);
                        }
                        break;

                    default:
                        Debug.Log(currentPartID);
                        break;
                }
            }
        }

    }
}
