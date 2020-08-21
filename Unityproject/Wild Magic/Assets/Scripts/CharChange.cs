using System.Collections;
using System.Collections.Generic;
using System;
using UnityEngine;
public class CharChange : MonoBehaviour
{
    public GameObject Char1;
    public GameObject Char2;
    public GameObject Char3;
    public GameObject Char4;
    public GameObject Char5;
    private GameObject CharPrecedent;
    private SpriteRenderer SHOWTAG;
    public static int CurrentCharId;
    private GameObject[] PERSO;
    // Start is called before the first frame update
    void Start()
    {
        PERSO = new GameObject[5];
        PERSO[0] = Char1;
        PERSO[1] = Char2;
        PERSO[2] = Char3;
        PERSO[3] = Char4;
        PERSO[4] = Char5;
        CurrentCharId = 0;
    }
    public void Callfrom1()
    {
        OnCall(Char1);
    }
    public void Callfrom2()
    {
        OnCall(Char2);
    }
    public void Callfrom3()
    {
        OnCall(Char3);
    }
    public void Callfrom4()
    {
        OnCall(Char4);
    }
    public void Callfrom5()
    {
        OnCall(Char5);
    }
    private void OnCall(GameObject CharCalled) 
    {
        CharPrecedent = PERSO[CurrentCharId];
        SHOWTAG = CharPrecedent.GetComponent<SpriteRenderer>();
        SHOWTAG.enabled = !SHOWTAG.enabled;
        SHOWTAG = CharCalled.GetComponent<SpriteRenderer>();
        SHOWTAG.enabled = !SHOWTAG.enabled;
        CurrentCharId = Array.IndexOf(PERSO,CharCalled);
        SpellMaker.SkillUpdater();
        SpellMaker.REsetter();
    }
    // Update is called once per frame
    void Update()
    {
        
    }
}
