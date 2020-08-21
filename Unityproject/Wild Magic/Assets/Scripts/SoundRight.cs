using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class SoundRight : MonoBehaviour
{
    public GameObject SRight;
    private AudioSource MyRenderer;
    // Start is called before the first frame update
    void Start()
    {
        Debug.Log("Song Charged!");
    }
    public void OnClickPlaySound()
    {
        MyRenderer = SRight.GetComponent<AudioSource>(); 
        MyRenderer.enabled = !MyRenderer.enabled;
        MyRenderer.enabled = !MyRenderer.enabled;
    }

    // Update is called once per frame
    void Update()
    {
        
    }
}
