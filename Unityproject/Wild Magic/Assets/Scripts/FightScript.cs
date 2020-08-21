using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class FightScript : MonoBehaviour
{
    private int[] Char1Stats = new int[5];
    private int[] Enemy1Stats = new int[5];
    private RectTransform RECTANGLE;
    public GameObject HPBarAlly1;
    public GameObject HPBarEnemy1;
    public GameObject ManaBarAlly1;
    public GameObject ManaBarEnemy1;
    public int Damage;
    // Start is called before the first frame update
    void Start()
    {
        Char1Stats[0] = 100;
        Char1Stats[1] = 100;
        Char1Stats[2] = 50;
        Char1Stats[3] = 50;
        Char1Stats[4] = 0;
        Enemy1Stats[0] = 10;
        Enemy1Stats[1] = 10;
        Enemy1Stats[2] = 10;
        Enemy1Stats[3] = 10;
        Enemy1Stats[4] = 0;
    }
    //here we list all the attack actions
    public void EnemyAttack1() 
    {
        Damage =(int)Random.Range(0, 10);
        Debug.Log("Dautime took "+Damage+" Damage");
        Char1Stats[0] -= Damage;
        Debug.Log(Char1Stats[0]+"/"+Char1Stats[1]);
    }
    // Update is called once per frame
    void Update()
    {
        RECTANGLE=HPBarAlly1.GetComponent<RectTransform>();
        RECTANGLE.localScale = new Vector3((float)Char1Stats[0]/Char1Stats[1],RECTANGLE.localScale.y,RECTANGLE.localScale.z);
    }
}
