using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.SceneManagement;

public class TabChange : MonoBehaviour
{
    public static int Const=0;
    private int SCENE = 0;
    public GameObject Tab1;
    public GameObject BT1;
    public GameObject Tab2;
    public GameObject BT2;
    public GameObject CharTab;
    public GameObject BCharT;
    public GameObject SpellTab;
    public GameObject BSpellT;
    private static Canvas Active;
    private static GameObject OldTab;
    private static GameObject OldB;
    private static Button IB;
    public static GameObject BT1bis;
    public static GameObject Tab1bis;
    public static GameObject BSpellTbis;
    public static GameObject SpellTabbis;
    public GameObject FightTab;
    // Start is called before the first frame update
    void Start()
    {
        OldTab = Tab1;
        OldB = BT1;
        BT1bis = BT1;
        Tab1bis = Tab1;
        BSpellTbis = BSpellT;
        SpellTabbis = SpellTab;
    }
    public void Callfrom1()
    {
        MoveScript.MoveAuthorization = true;
        Const = 0;
        OnClickChangeTab(Tab1bis,BT1bis);
    }
    public static void Callfrom1bis() 
    {
        MoveScript.MoveAuthorization = true;
        Const = 0;
        OnClickChangeTab(Tab1bis, BT1bis);
    }
    public void Callfrom2()
    {
        MoveScript.MoveAuthorization = false;
        Const = 1;
        OnClickChangeTab(Tab2,BT2);
    }
    public void Callfrom3()
    {
        MoveScript.MoveAuthorization = false;
        Const = 2;
        OnClickChangeTab(CharTab,BCharT);
    }
    public void CallfromSpellTB()
    {
        MoveScript.MoveAuthorization = false;
        Const = 3;
        OnClickChangeTab(SpellTabbis, BSpellTbis);
    }

    public static void OnClickChangeTab(GameObject NewTab, GameObject NewB)
    {
        Active = OldTab.GetComponent<Canvas>();
        Active.enabled = !Active.enabled;
        Active = NewTab.GetComponent<Canvas>();
        Active.enabled = !Active.enabled;
        IB = NewB.GetComponent<Button>();
        IB.interactable = false;
        IB = OldB.GetComponent<Button>();
        IB.interactable = true;
        OldTab = NewTab;
        OldB = NewB;
    }
    public void ToFightScene()
    {
        if (SCENE==0) 
        {
            MoveScript.MoveAuthorization = false;
            FightTab.SetActive(true); 
        }
        else {
            MoveScript.MoveAuthorization = true;
            FightTab.SetActive(false);
        }
        SCENE = 1 - SCENE;
    }
    // Update is called once per frame
    void Update()
    {
        if (Input.GetKey(KeyCode.Escape))
        {
            Application.Quit();
        }
    }
}
