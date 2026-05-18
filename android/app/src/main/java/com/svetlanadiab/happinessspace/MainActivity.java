package com.svetlanadiab.happinessspace;

import android.content.Intent;
import android.os.Bundle;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        registerPlugin(BackgroundSyncPlugin.class);
        super.onCreate(savedInstanceState);
        BackgroundMessageWorker.schedule(this);
    }

    @Override
    public void onResume() {
        super.onResume();
        deliverIntentToWeb(getIntent());
    }

    @Override
    protected void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
        setIntent(intent);
        deliverIntentToWeb(intent);
    }

    private void deliverIntentToWeb(Intent intent) {
        if (
                intent == null ||
                        bridge == null ||
                        bridge.getWebView() == null ||
                        !"messages".equals(intent.getStringExtra("open_panel"))
        ) {
            return;
        }

        String messageId = intent.getStringExtra("message_id");
        if (messageId == null) {
            messageId = "";
        }
        String safeMessageId = messageId.replace("\\", "\\\\").replace("'", "\\'");
        String script =
                "window.dispatchEvent(new CustomEvent('svetaNativeOpen', { detail: { panel: 'messages', messageId: '" +
                        safeMessageId +
                        "' } }));";
        bridge.getWebView().postDelayed(() -> bridge.getWebView().evaluateJavascript(script, null), 600);
        intent.removeExtra("open_panel");
        intent.removeExtra("message_id");
    }
}
