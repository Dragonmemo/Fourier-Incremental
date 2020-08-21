using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using System;

public class MoveScript : MonoBehaviour
{
    public GameObject CHARPOS;
    public static Transform Position;
    public static bool MoveAuthorization;
    private GameObject COLLIDERS;
    private string CurCollName;
    private BoxCollider2D[] Collisionneur;
    private Vector3 POSITION;
    
    // Start is called before the first frame update
    void Start()
    {
        Position = CHARPOS.GetComponent<Transform>();
        MoveAuthorization = true;
        Debug.Log("We Made It Here!");
        CurCollName = "0A";
    }

    private void MovingAbled(float SignX, float SignY,Transform position) 
    {
        if (MoveAuthorization && (SignX!=0 || SignY!=0))
        {
            if (SignX<0)
            {
                StartCoroutine(Moverer(-1, 0,position));
            }
            if (SignX>0)
            {
                StartCoroutine(Moverer(1, 0, position));
            }
            if (SignY<0 && SignX==0)
            {
                StartCoroutine(Moverer(0, -1,position));
            }
            if (SignY>0 && SignX==0)
            {
                StartCoroutine(Moverer(0, 1,position));
            }
        }
    }
    private bool CheckPosAuthor(int x, int y, Vector3 pos) 
    {
        COLLIDERS=GameObject.Find(CurCollName);
        Collisionneur = COLLIDERS.GetComponents<BoxCollider2D>();
        for (int i = 0; i < Collisionneur.Length; i++)
        {
            if (Collisionneur[i].bounds.Contains(pos + new Vector3(x, y-0.5f, 0)))
            {
            return true;
            }
        }
        return false;
    }
    private IEnumerator Moverer(int Xs, int Ys,Transform position)
    {
        if (CheckPosAuthor(Xs,Ys,position.position))
        {
            POSITION = position.position;
            MoveAuthorization = false;
            Debug.Log(Xs + " " + Ys);
            // loop over 1 second forward
            for (float i = 0; i <= 0.5; i += Time.deltaTime)
            {
                // move with i as instant speed
                transform.Translate(new Vector3(Xs, Ys, 0) * (Convert.ToSingle(Math.PI * Math.Sin(2*i*Math.PI)) * 3/4 + 0.5f )* Time.deltaTime);
                yield return null;
            }
            transform.SetPositionAndRotation(POSITION + new Vector3(Xs, Ys, 0), position.rotation);
            MoveAuthorization = true;
        }
    }
    // Update is called once per frame
    void Update()
    {
        if (TabChange.Const==0)
        {
            float horizontalInput = Input.GetAxis("Horizontal");
            //Get the value of the Horizontal input axis.
            float verticalInput = Input.GetAxis("Vertical");
            //Get the value of the Vertical input axis.
            MovingAbled(horizontalInput,verticalInput, Position.transform);
            //transform.Translate(new Vector3(horizontalInput, verticalInput, 0) * MoveSpeed);
        }
    }
}
