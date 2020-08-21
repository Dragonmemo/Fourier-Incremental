using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class SpellCaster : MonoBehaviour
{
    public GameObject Tornado;
    private static string CastCrossName;
    private static GameObject SpellCasted;
    private static int Lifetime;
    private bool SpellBool;
    private static GameObject Tornadobis;

    // Start is called before the first frame update
    void Start()
    {
        CastCrossName = null;
        SpellCasted = null;
        SpellBool = true;
        Tornadobis = Tornado;
    }

    public static void SpellCastbis()
    {
        TabChange.Callfrom1bis();
        MoveScript.MoveAuthorization = false;
        CastCrossName = "Tornado";
        SpellCasted = Tornadobis;
        SpellCasted.transform.position = MoveScript.Position.position;
        Lifetime = 5;
    }
    public void SpellCast()
    {
        TabChange.Callfrom1bis();
        MoveScript.MoveAuthorization = false;
        CastCrossName = "Tornado";
        SpellCasted = Tornado;
        SpellCasted.transform.position = MoveScript.Position.position;
        Lifetime = 5;
    }

    void CastCrossD() 
    {
        SpellCasted.SetActive(false);
        CastCrossName = null;
        SpellCasted = null;
        MoveScript.MoveAuthorization = true;
        SpellBool = true;
    }
    private void MovingAbled(float SignX, float SignY, Transform position)
    {
        if (SpellBool && (SignX != 0 || SignY != 0))
        {
            SpellBool = false;
            if (SignX < 0)
            {
                StartCoroutine(Moverer(-1, 0, position));
            }
            if (SignX > 0)
            {
                StartCoroutine(Moverer(1, 0, position));
            }
            if (SignY < 0 && SignX == 0)
            {
                StartCoroutine(Moverer(0, -1, position));
            }
            if (SignY > 0 && SignX == 0)
            {
                StartCoroutine(Moverer(0, 1, position));
            }
        }
    }
    private IEnumerator Moverer(int Xs, int Ys, Transform position)
    {
        SpellCasted.SetActive(true);
        Vector3 POSITION = position.position;
        Debug.Log(Xs + " " + Ys);
        // loop over 1 second forward
        for (float i = 0; i <= 0.5; i += Time.deltaTime)
        {
            // move with i as instant speed
            position.Translate(new Vector3(Xs, Ys, 0) * 2*Time.deltaTime);
            yield return null;
        }
        position.SetPositionAndRotation(POSITION + new Vector3(Xs, Ys, 0), position.rotation);
        if (Lifetime!=0)
        {
            Lifetime=Lifetime-1;
            Debug.Log(Lifetime);
            StartCoroutine(Moverer(Xs, Ys, position));
        }
        else
        {
            Debug.Log("je suis à 0?");
            CastCrossD();
        }
    }
    // Update is called once per frame
    void Update()
    {
        if (CastCrossName!=null)
        {
            float horizontalInput = Input.GetAxis("Horizontal");
            //Get the value of the Horizontal input axis.
            float verticalInput = Input.GetAxis("Vertical");
            //Get the value of the Vertical input axis.
            MovingAbled(horizontalInput, verticalInput, SpellCasted.transform);
        }
    }
}
